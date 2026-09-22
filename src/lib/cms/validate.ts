import type { AboutEditable, FaqEntry, ProcessStep, Service } from "@/content/types";

export type Errors = Record<string, string>;
export type Result<T> = { ok: true; value: T } | { ok: false; errors: Errors };

const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** Collapse whitespace and strip control characters. All content is plain text. */
function clean(v: unknown): string {
  return typeof v === "string" ? v.replace(/[\u0000-\u001F\u007F]+/g, " ").replace(/\s+/g, " ").trim() : "";
}

function text(v: unknown, max: number, errors: Errors, key: string, label: string, required = true): string {
  const s = clean(v);
  if (required && !s) errors[key] = `${label} is required.`;
  else if (s.length > max) errors[key] = `${label} must be ${max} characters or fewer.`;
  return s;
}

function asList(input: unknown, min: number, max: number, errors: Errors, noun: string): unknown[] {
  if (!Array.isArray(input)) {
    errors.list = "Something went wrong with the form data. Please reload the page.";
    return [];
  }
  if (input.length < min) errors.list = `Keep at least ${min} ${noun}.`;
  if (input.length > max) errors.list = `You can have at most ${max} ${noun}.`;
  return input.slice(0, max);
}

function idField(v: unknown, seen: Set<string>, errors: Errors, key: string): string {
  const id = clean(v);
  if (!ID.test(id) || id.length > 60) errors[key] = "Internal id is invalid. Reload the page and try again.";
  else if (seen.has(id)) errors[key] = "Duplicate internal id. Reload the page and try again.";
  seen.add(id);
  return id;
}

const bool = (v: unknown) => v === true;

function requireVisible(items: { hidden?: boolean }[], errors: Errors, noun: string) {
  if (items.length && items.every((i) => i.hidden) && !errors.list) errors.list = `At least one ${noun} must stay visible on the site.`;
}

export function validateFaqs(input: unknown): Result<FaqEntry[]> {
  const errors: Errors = {};
  const seen = new Set<string>();
  const value = asList(input, 1, 30, errors, "questions").map((raw, i) => {
    const r = (raw ?? {}) as Record<string, unknown>;
    return {
      id: idField(r.id, seen, errors, `${i}.id`),
      question: text(r.question, 200, errors, `${i}.question`, "Question"),
      answer: text(r.answer, 1200, errors, `${i}.answer`, "Answer"),
      featured: bool(r.featured),
      hidden: bool(r.hidden),
    };
  });
  requireVisible(value, errors, "question");
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value };
}

export function validateServices(input: unknown): Result<Service[]> {
  const errors: Errors = {};
  const seen = new Set<string>();
  const value = asList(input, 1, 6, errors, "services").map((raw, i) => {
    const r = (raw ?? {}) as Record<string, unknown>;
    const caps = Array.isArray(r.capabilities) ? r.capabilities : [];
    if (caps.length < 1 || caps.length > 8) errors[`${i}.capabilities`] = "List between 1 and 8 things this service can include.";
    const capabilities = caps.slice(0, 8).map((c) => clean(c)).filter(Boolean);
    if (capabilities.some((c) => c.length > 80)) errors[`${i}.capabilities`] = "Each item must be 80 characters or fewer.";
    return {
      id: idField(r.id, seen, errors, `${i}.id`),
      title: text(r.title, 80, errors, `${i}.title`, "Title"),
      summary: text(r.summary, 300, errors, `${i}.summary`, "Description"),
      capabilities,
      example: text(r.example, 300, errors, `${i}.example`, "Example situation"),
      hidden: bool(r.hidden),
    };
  });
  requireVisible(value, errors, "service");
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value };
}

export function validateProcess(input: unknown): Result<ProcessStep[]> {
  const errors: Errors = {};
  const value = asList(input, 1, 10, errors, "steps").map((raw, i) => {
    const r = (raw ?? {}) as Record<string, unknown>;
    return {
      title: text(r.title, 60, errors, `${i}.title`, "Title"),
      description: text(r.description, 200, errors, `${i}.description`, "Short description"),
      detail: text(r.detail, 400, errors, `${i}.detail`, "Detail"),
      hidden: bool(r.hidden),
    };
  });
  requireVisible(value, errors, "step");
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value };
}

export function validateAbout(input: unknown): Result<AboutEditable> {
  const errors: Errors = {};
  const r = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const intro = text(r.intro, 300, errors, "intro", "Introduction");

  const paras = Array.isArray(r.paragraphs) ? r.paragraphs : [];
  if (paras.length < 1 || paras.length > 4) errors.paragraphs = "Keep between 1 and 4 philosophy paragraphs.";
  const paragraphs = paras.slice(0, 4).map((p, i) => text(p, 600, errors, `paragraph.${i}`, "Paragraph"));

  const items = Array.isArray(r.approachItems) ? r.approachItems : [];
  if (items.length < 1 || items.length > 6) errors.approach = "Keep between 1 and 6 approach items.";
  const approachItems = items.slice(0, 6).map((raw, i) => {
    const it = (raw ?? {}) as Record<string, unknown>;
    return {
      title: text(it.title, 80, errors, `approach.${i}.title`, "Title"),
      description: text(it.description, 300, errors, `approach.${i}.description`, "Description"),
    };
  });

  const p = (r.person && typeof r.person === "object" ? r.person : {}) as Record<string, unknown>;
  const person = {
    name: text(p.name, 80, errors, "person.name", "Name", false),
    role: text(p.role, 80, errors, "person.role", "Role", false),
    bio: text(p.bio, 800, errors, "person.bio", "Bio", false),
  };
  if (person.bio && !person.name) errors["person.name"] = "Add your name, or clear the bio.";

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value: { intro, paragraphs, approachItems, person } };
}
