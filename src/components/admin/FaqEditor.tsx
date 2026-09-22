"use client";

import { useActionState, useState } from "react";
import { saveFaqsAction, type ContentSaveState } from "@/app/(admin)/admin/(panel)/actions";
import type { FaqEntry } from "@/content/types";
import { AddButton, EditorForm, ItemFrame, newKey, stripKey, TextArea, TextInput, useList, withKeys } from "./editor";

type Item = FaqEntry & { _key: string };

export function FaqEditor({ initial }: { initial: FaqEntry[] }) {
  const [state, action, pending] = useActionState<ContentSaveState, FormData>(saveFaqsAction, { status: "idle" });
  const [edited, setEdited] = useState(false);
  const list = useList<Item>(withKeys(initial, (f) => f.id), () => setEdited(true));
  const errors = edited ? {} : (state.errors ?? {});

  return (
    <EditorForm action={action} pending={pending} status={state.status} message={state.message} listError={errors.list} payload={list.items.map(stripKey)} onSubmit={() => setEdited(false)}>
      <ol className="space-y-5">
        {list.items.map((f, i) => (
          <ItemFrame key={f._key} label="Question" name={f.question} index={i} total={list.items.length} onMove={(d) => list.move(f._key, d)} onRemove={() => list.remove(f._key)} hidden={f.hidden} onToggleHidden={(h) => list.update(f._key, { hidden: h })}>
            <TextInput id={`${f._key}-first`} label="Question" value={f.question} maxLength={200} error={errors[`${i}.question`]} onChange={(v) => list.update(f._key, { question: v })} />
            <TextArea id={`${f._key}-answer`} label="Answer" value={f.answer} maxLength={1200} error={errors[`${i}.answer`]} onChange={(v) => list.update(f._key, { answer: v })} />
            <div className="flex items-center gap-2.5">
              <input id={`${f._key}-featured`} type="checkbox" checked={!!f.featured} onChange={(e) => list.update(f._key, { featured: e.target.checked })} className="size-5 accent-[var(--accent)]" />
              <label htmlFor={`${f._key}-featured`} className="text-sm font-medium">
                Also show on the homepage
              </label>
            </div>
          </ItemFrame>
        ))}
      </ol>
      <div className="mt-5">
        <AddButton disabled={list.items.length >= 30} onClick={() => list.add({ _key: newKey(), id: `q-${newKey()}`, question: "", answer: "", featured: false, hidden: false })}>
          Add a question
        </AddButton>
      </div>
    </EditorForm>
  );
}
