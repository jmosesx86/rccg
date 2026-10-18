import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import Select from "./Select";

type Base = { label: string; name: string; full?: boolean; hint?: string };

const wrap = (full?: boolean) => (full ? "sm:col-span-2" : "");

function Label({ name, label, required }: { name: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={name} className="label">
      {label}
      {required && <span className="text-primary"> *</span>}
    </label>
  );
}

export function TextField({ label, name, full, hint, ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={wrap(full)}>
      <Label name={name} label={label} required={rest.required} />
      <input id={name} name={name} className="input" {...rest} />
      {hint && <p className="mt-1.5 text-xs text-ink-soft">{hint}</p>}
    </div>
  );
}

export function TextAreaField({ label, name, full = true, hint, ...rest }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={wrap(full)}>
      <Label name={name} label={label} required={rest.required} />
      <textarea id={name} name={name} rows={5} className="input resize-y" {...rest} />
      {hint && <p className="mt-1.5 text-xs text-ink-soft">{hint}</p>}
    </div>
  );
}

export function SelectField({
  label,
  name,
  full,
  options,
  placeholder = "Select…",
  required,
  searchable,
}: Base & { options: string[]; placeholder?: string; required?: boolean; searchable?: boolean }) {
  return (
    <div className={wrap(full)}>
      <Label name={name} label={label} required={required} />
      <Select
        id={name}
        name={name}
        required={required}
        searchable={searchable}
        placeholder={placeholder}
        options={options.map((o) => ({ value: o, label: o }))}
      />
    </div>
  );
}

export function CheckboxField({ label, name, full = true, ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label htmlFor={name} className={`flex cursor-pointer items-start gap-3 text-sm text-ink-muted ${wrap(full)}`}>
      <input id={name} name={name} type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 rounded accent-primary" {...rest} />
      <span>{label}</span>
    </label>
  );
}
