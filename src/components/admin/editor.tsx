"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Field, inputClass } from "./Field";

export type Keyed = { _key: string };
export const newKey = () => Math.random().toString(36).slice(2, 10);
export const withKeys = <T extends object>(items: T[], keyOf?: (i: T) => string) =>
  items.map((i) => ({ ...i, _key: keyOf ? keyOf(i) : newKey() }));
export const stripKey = <T extends Keyed>({ _key, ...rest }: T) => {
  void _key;
  return rest;
};

/** List state with add / remove / reorder. `onEdit` lets the form hide stale server errors. */
export function useList<T extends Keyed>(initial: T[], onEdit: () => void) {
  const [items, setItems] = useState<T[]>(initial);
  const [focusKey, setFocusKey] = useState<string | null>(null);

  useEffect(() => {
    if (focusKey) {
      document.getElementById(`${focusKey}-first`)?.focus();
      setFocusKey(null);
    }
  }, [focusKey]);

  return {
    items,
    setItems,
    update(key: string, patch: Partial<T>) {
      setItems((p) => p.map((i) => (i._key === key ? { ...i, ...patch } : i)));
      onEdit();
    },
    move(key: string, dir: -1 | 1) {
      setItems((p) => {
        const idx = p.findIndex((i) => i._key === key);
        const to = idx + dir;
        if (idx < 0 || to < 0 || to >= p.length) return p;
        const next = [...p];
        [next[idx], next[to]] = [next[to], next[idx]];
        return next;
      });
      onEdit();
    },
    remove(key: string) {
      setItems((p) => p.filter((i) => i._key !== key));
      onEdit();
    },
    add(item: T) {
      setItems((p) => [...p, item]);
      setFocusKey(item._key);
      onEdit();
    },
  };
}

const btn = "inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border border-line-strong px-2.5 text-sm font-medium transition-colors hover:bg-surface disabled:opacity-40 disabled:hover:bg-transparent";

type FrameProps = {
  label: string;
  name: string;
  index: number;
  total: number;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
  hidden?: boolean;
  onToggleHidden?: (hidden: boolean) => void;
  removable?: boolean;
  children: ReactNode;
};

/** One editable item: title, reorder buttons, show/hide switch and a two-step remove. */
export function ItemFrame({ label, name, index, total, onMove, onRemove, hidden, onToggleHidden, removable = true, children }: FrameProps) {
  const [confirming, setConfirming] = useState(false);
  const removeRef = useRef<HTMLButtonElement>(null);
  const shown = name || "untitled";
  return (
    <li className={`rounded-lg border p-4 sm:p-5 ${hidden ? "border-dashed border-line-strong bg-surface" : "border-line-strong"}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">
          {label} {index + 1}
          {hidden ? <span className="ms-2 text-sm font-normal text-muted">(hidden)</span> : null}
        </h2>
        <div className="flex flex-wrap items-center gap-1.5">
          <button type="button" className={btn} onClick={() => onMove(-1)} disabled={index === 0} aria-label={`Move up: ${shown}`}>
            <span aria-hidden="true">↑</span>
          </button>
          <button type="button" className={btn} onClick={() => onMove(1)} disabled={index === total - 1} aria-label={`Move down: ${shown}`}>
            <span aria-hidden="true">↓</span>
          </button>
          {removable ? (
            confirming ? (
              <>
                <button type="button" className={`${btn} border-red-600 text-red-700 dark:text-red-400`} onClick={onRemove}>
                  Yes, remove
                </button>
                <button type="button" className={btn} onClick={() => setConfirming(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <button ref={removeRef} type="button" className={btn} onClick={() => setConfirming(true)} aria-label={`Remove: ${shown}`}>
                Remove
              </button>
            )
          ) : null}
        </div>
      </div>
      {onToggleHidden ? (
        <div className="mt-3 flex items-center gap-2.5">
          <input id={`${name}-${index}-show`} type="checkbox" checked={!hidden} onChange={(e) => onToggleHidden(!e.target.checked)} className="size-5 accent-[var(--accent)]" />
          <label htmlFor={`${name}-${index}-show`} className="text-sm font-medium">
            Show on the site
          </label>
        </div>
      ) : null}
      <div className="mt-5 space-y-5">{children}</div>
    </li>
  );
}

type BaseProps = { id: string; label: string; hint?: string; error?: string; value: string; onChange: (v: string) => void; maxLength?: number };

export function TextInput({ id, label, hint, error, value, onChange, maxLength }: BaseProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error}>
      {(a) => <input {...a} type="text" value={value} maxLength={maxLength} onChange={(e) => onChange(e.target.value)} className={inputClass} />}
    </Field>
  );
}

export function TextArea({ id, label, hint, error, value, onChange, maxLength, rows = 4 }: BaseProps & { rows?: number }) {
  return (
    <Field id={id} label={label} hint={hint} error={error}>
      {(a) => <textarea {...a} rows={rows} value={value} maxLength={maxLength} onChange={(e) => onChange(e.target.value)} className={`${inputClass} resize-y leading-normal`} />}
    </Field>
  );
}

export function AddButton({ onClick, children, disabled }: { onClick: () => void; children: ReactNode; disabled?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="inline-flex min-h-11 items-center rounded-md border border-dashed border-line-strong px-4 font-medium transition-colors hover:bg-surface disabled:opacity-50">
      + {children}
    </button>
  );
}

type FormProps = {
  action: (fd: FormData) => void;
  pending: boolean;
  status: "idle" | "saved" | "error";
  message?: string;
  listError?: string;
  payload: unknown;
  onSubmit: () => void;
  children: ReactNode;
};

/** Shared form shell: hidden JSON payload, list-level error, and a sticky save bar with a live status message. */
export function EditorForm({ action, pending, status, message, listError, payload, onSubmit, children }: FormProps) {
  return (
    <form action={action} onSubmit={onSubmit} noValidate>
      <input type="hidden" name="payload" value={JSON.stringify(payload)} />
      {listError ? (
        <p role="alert" className="mb-5 rounded-md border border-red-600 p-3 font-medium text-red-700 dark:text-red-400">
          {listError}
        </p>
      ) : null}
      {children}
      <div className="sticky bottom-0 z-10 mt-8 flex flex-wrap items-center gap-4 border-t border-line bg-bg/95 py-3 backdrop-blur">
        <button type="submit" disabled={pending} className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-6 py-2.5 font-medium text-on-accent transition-colors hover:bg-accent-strong disabled:opacity-70">
          {pending ? "Saving…" : "Save changes"}
        </button>
        <div aria-live="polite" className="text-sm font-medium">
          {status === "saved" ? <span role="status" className="text-accent-text">{message}</span> : null}
          {status === "error" ? <span role="alert" className="text-red-700 dark:text-red-400">{message}</span> : null}
        </div>
      </div>
    </form>
  );
}
