"use client";

import { useActionState, useState } from "react";
import { saveProcessAction, type ContentSaveState } from "@/app/(admin)/admin/(panel)/actions";
import type { ProcessStep } from "@/content/types";
import { AddButton, EditorForm, ItemFrame, newKey, stripKey, TextArea, TextInput, useList, withKeys } from "./editor";

type Item = ProcessStep & { _key: string };

export function ProcessEditor({ initial }: { initial: ProcessStep[] }) {
  const [state, action, pending] = useActionState<ContentSaveState, FormData>(saveProcessAction, { status: "idle" });
  const [edited, setEdited] = useState(false);
  const list = useList<Item>(withKeys(initial), () => setEdited(true));
  const errors = edited ? {} : (state.errors ?? {});

  return (
    <EditorForm action={action} pending={pending} status={state.status} message={state.message} listError={errors.list} payload={list.items.map(stripKey)} onSubmit={() => setEdited(false)}>
      <ol className="space-y-5">
        {list.items.map((s, i) => (
          <ItemFrame key={s._key} label="Step" name={s.title} index={i} total={list.items.length} onMove={(d) => list.move(s._key, d)} onRemove={() => list.remove(s._key)} hidden={s.hidden} onToggleHidden={(h) => list.update(s._key, { hidden: h })}>
            <TextInput id={`${s._key}-first`} label="Title" value={s.title} maxLength={60} error={errors[`${i}.title`]} onChange={(v) => list.update(s._key, { title: v })} />
            <TextInput id={`${s._key}-desc`} label="Short description" hint="Shown in the homepage overview." value={s.description} maxLength={200} error={errors[`${i}.description`]} onChange={(v) => list.update(s._key, { description: v })} />
            <TextArea id={`${s._key}-detail`} label="Detail" hint="Shown on the Process page." value={s.detail} maxLength={400} rows={3} error={errors[`${i}.detail`]} onChange={(v) => list.update(s._key, { detail: v })} />
          </ItemFrame>
        ))}
      </ol>
      <div className="mt-5">
        <AddButton disabled={list.items.length >= 10} onClick={() => list.add({ _key: newKey(), title: "", description: "", detail: "", hidden: false })}>
          Add a step
        </AddButton>
      </div>
    </EditorForm>
  );
}
