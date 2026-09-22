"use client";

import { useActionState, useState } from "react";
import { saveAboutAction, type ContentSaveState } from "@/app/(admin)/admin/(panel)/actions";
import type { AboutEditable } from "@/content/types";
import { AddButton, EditorForm, ItemFrame, newKey, TextArea, TextInput, useList } from "./editor";

type Para = { _key: string; text: string };
type Approach = { _key: string; title: string; description: string };

export function AboutEditor({ initial }: { initial: AboutEditable }) {
  const [state, action, pending] = useActionState<ContentSaveState, FormData>(saveAboutAction, { status: "idle" });
  const [edited, setEdited] = useState(false);
  const touch = () => setEdited(true);
  const [intro, setIntro] = useState(initial.intro);
  const [person, setPerson] = useState({ name: initial.person.name ?? "", role: initial.person.role ?? "", bio: initial.person.bio ?? "" });
  const paras = useList<Para>(initial.paragraphs.map((t) => ({ _key: newKey(), text: t })), touch);
  const approach = useList<Approach>(initial.approachItems.map((a) => ({ _key: newKey(), ...a })), touch);
  const errors = edited ? {} : (state.errors ?? {});

  const payload = {
    intro,
    paragraphs: paras.items.map((p) => p.text),
    approachItems: approach.items.map(({ title, description }) => ({ title, description })),
    person,
  };

  return (
    <EditorForm action={action} pending={pending} status={state.status} message={state.message} payload={payload} onSubmit={() => setEdited(false)}>
      <div className="space-y-12">
        <section aria-labelledby="about-intro" className="space-y-5">
          <h2 id="about-intro" className="font-display text-2xl font-medium">Introduction</h2>
          <TextArea id="intro" label="Opening line" hint="Shown under the page title." value={intro} maxLength={300} rows={3} error={errors.intro} onChange={(v) => { setIntro(v); touch(); }} />
        </section>

        <section aria-labelledby="about-philosophy">
          <h2 id="about-philosophy" className="font-display text-2xl font-medium">Our philosophy</h2>
          {errors.paragraphs ? <p role="alert" className="mt-3 font-medium text-red-700 dark:text-red-400">{errors.paragraphs}</p> : null}
          <ol className="mt-5 space-y-5">
            {paras.items.map((p, i) => (
              <ItemFrame key={p._key} label="Paragraph" name={p.text.slice(0, 30)} index={i} total={paras.items.length} onMove={(d) => paras.move(p._key, d)} onRemove={() => paras.remove(p._key)}>
                <TextArea id={`${p._key}-first`} label="Text" value={p.text} maxLength={600} rows={4} error={errors[`paragraph.${i}`]} onChange={(v) => paras.update(p._key, { text: v })} />
              </ItemFrame>
            ))}
          </ol>
          <div className="mt-5"><AddButton disabled={paras.items.length >= 4} onClick={() => paras.add({ _key: newKey(), text: "" })}>Add a paragraph</AddButton></div>
        </section>

        <section aria-labelledby="about-approach">
          <h2 id="about-approach" className="font-display text-2xl font-medium">How we approach software</h2>
          {errors.approach ? <p role="alert" className="mt-3 font-medium text-red-700 dark:text-red-400">{errors.approach}</p> : null}
          <ol className="mt-5 space-y-5">
            {approach.items.map((a, i) => (
              <ItemFrame key={a._key} label="Point" name={a.title} index={i} total={approach.items.length} onMove={(d) => approach.move(a._key, d)} onRemove={() => approach.remove(a._key)}>
                <TextInput id={`${a._key}-first`} label="Title" value={a.title} maxLength={80} error={errors[`approach.${i}.title`]} onChange={(v) => approach.update(a._key, { title: v })} />
                <TextArea id={`${a._key}-desc`} label="Description" value={a.description} maxLength={300} rows={3} error={errors[`approach.${i}.description`]} onChange={(v) => approach.update(a._key, { description: v })} />
              </ItemFrame>
            ))}
          </ol>
          <div className="mt-5"><AddButton disabled={approach.items.length >= 6} onClick={() => approach.add({ _key: newKey(), title: "", description: "" })}>Add a point</AddButton></div>
        </section>

        <section aria-labelledby="about-person" className="space-y-5">
          <h2 id="about-person" className="font-display text-2xl font-medium">Who is behind Softsmith</h2>
          <p className="text-sm text-muted">Leave the bio empty to show a short neutral sentence instead. Only write what you are happy to publish.</p>
          <TextInput id="person-name" label="Name" value={person.name} maxLength={80} error={errors["person.name"]} onChange={(v) => { setPerson((p) => ({ ...p, name: v })); touch(); }} />
          <TextInput id="person-role" label="Role" value={person.role} maxLength={80} error={errors["person.role"]} onChange={(v) => { setPerson((p) => ({ ...p, role: v })); touch(); }} />
          <TextArea id="person-bio" label="Short bio" value={person.bio} maxLength={800} rows={5} error={errors["person.bio"]} onChange={(v) => { setPerson((p) => ({ ...p, bio: v })); touch(); }} />
        </section>
      </div>
    </EditorForm>
  );
}
