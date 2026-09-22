"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { saveServicesAction, type ContentSaveState } from "@/app/(admin)/admin/(panel)/actions";
import type { Service } from "@/content/types";
import { AddButton, EditorForm, ItemFrame, newKey, TextArea, TextInput, useList } from "./editor";

type Item = { _key: string; id: string; isNew: boolean; title: string; summary: string; capabilitiesText: string; example: string; hidden: boolean };

const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "service";

/** Existing services keep their id (so links like /services#websites keep working); new ones get an id from their title. */
function withIds(items: Item[]): Item[] {
  const taken = new Set(items.filter((i) => !i.isNew).map((i) => i.id));
  return items.map((i) => {
    if (!i.isNew) return i;
    const base = slug(i.title);
    let id = base;
    for (let n = 2; taken.has(id); n++) id = `${base}-${n}`;
    taken.add(id);
    return { ...i, id };
  });
}

export function ServiceEditor({ initial }: { initial: Service[] }) {
  const [state, action, pending] = useActionState<ContentSaveState, FormData>(saveServicesAction, { status: "idle" });
  const [edited, setEdited] = useState(false);
  const list = useList<Item>(
    initial.map((s) => ({ _key: s.id, id: s.id, isNew: false, title: s.title, summary: s.summary, capabilitiesText: s.capabilities.join("\n"), example: s.example, hidden: !!s.hidden })),
    () => setEdited(true),
  );
  const errors = edited ? {} : (state.errors ?? {});
  const resolved = useMemo(() => withIds(list.items), [list.items]);
  const payload = resolved.map((i) => ({ id: i.id, title: i.title, summary: i.summary, capabilities: i.capabilitiesText.split("\n"), example: i.example, hidden: i.hidden }));

  // After a successful save, lock in the ids so later title edits don't change link anchors.
  const { status } = state;
  const { setItems } = list;
  useEffect(() => {
    if (status === "saved") setItems((prev) => withIds(prev).map((i) => ({ ...i, isNew: false })));
  }, [status, state, setItems]);

  return (
    <EditorForm action={action} pending={pending} status={state.status} message={state.message} listError={errors.list} payload={payload} onSubmit={() => setEdited(false)}>
      <ol className="space-y-5">
        {list.items.map((s, i) => (
          <ItemFrame key={s._key} label="Service" name={s.title} index={i} total={list.items.length} onMove={(d) => list.move(s._key, d)} onRemove={() => list.remove(s._key)} hidden={s.hidden} onToggleHidden={(h) => list.update(s._key, { hidden: h })}>
            <TextInput id={`${s._key}-first`} label="Title" value={s.title} maxLength={80} error={errors[`${i}.title`]} onChange={(v) => list.update(s._key, { title: v })} />
            <TextArea id={`${s._key}-summary`} label="Description" value={s.summary} maxLength={300} rows={3} error={errors[`${i}.summary`]} onChange={(v) => list.update(s._key, { summary: v })} />
            <TextArea id={`${s._key}-caps`} label="What this can include" hint="One item per line, up to 8." value={s.capabilitiesText} rows={5} error={errors[`${i}.capabilities`]} onChange={(v) => list.update(s._key, { capabilitiesText: v })} />
            <TextArea id={`${s._key}-example`} label="Example situation" hint="A generic example, not a claim about a past client." value={s.example} maxLength={300} rows={3} error={errors[`${i}.example`]} onChange={(v) => list.update(s._key, { example: v })} />
          </ItemFrame>
        ))}
      </ol>
      <div className="mt-5">
        <AddButton disabled={list.items.length >= 6} onClick={() => list.add({ _key: newKey(), id: "", isNew: true, title: "", summary: "", capabilitiesText: "", example: "", hidden: false })}>
          Add a service
        </AddButton>
      </div>
    </EditorForm>
  );
}
