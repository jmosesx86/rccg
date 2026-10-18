"use client";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Check, ChevronDown, Search } from "lucide-react";

export type SelectOption = {
  value: string;
  label: string;
  /** Leading visual, e.g. a flag or icon */
  icon?: ReactNode;
  /** Secondary text shown on the right, e.g. a dialling code */
  hint?: string;
  /** Extra text matched by search */
  keywords?: string;
};

type SelectProps = {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Submits the value with the surrounding form */
  name?: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  /** Shows a search box at the top of the list (for long lists) */
  searchable?: boolean;
  searchPlaceholder?: string;
  "aria-label"?: string;
  /** Replaces the default trigger styling */
  triggerClassName?: string;
  /** Extra classes for the popup, e.g. a fixed width */
  menuClassName?: string;
  /** Custom content for the closed trigger */
  renderValue?: (option: SelectOption) => ReactNode;
  className?: string;
};

const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/**
 * Accessible custom select (WAI-ARIA "select-only combobox" pattern) that replaces the native
 * <select>. Supports keyboard navigation, type-ahead, optional search, form submission and
 * required validation.
 */
export default function Select({
  options,
  value: controlled,
  defaultValue = "",
  onChange,
  name,
  id,
  placeholder = "Select…",
  required,
  searchable,
  searchPlaceholder = "Search…",
  "aria-label": ariaLabel,
  triggerClassName,
  menuClassName = "",
  renderValue,
  className = "",
}: SelectProps) {
  const autoId = useId();
  const triggerId = id ?? `select-${autoId}`;
  const listId = `${triggerId}-list`;

  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = controlled ?? uncontrolled;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [query, setQuery] = useState("");
  const [dropUp, setDropUp] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef({ text: "", timer: 0 as unknown as ReturnType<typeof setTimeout> });

  const selected = options.find((o) => o.value === value);

  const visible = useMemo(() => {
    if (!searchable || !query.trim()) return options;
    const q = normalize(query.trim());
    // Rank: label starts with the query, then a word in the label does, then any other match.
    const rank = (o: SelectOption) => {
      const label = normalize(o.label);
      if (label.startsWith(q)) return 0;
      if (label.split(/[\s(-]+/).some((w) => w.startsWith(q))) return 1;
      return normalize(`${o.label} ${o.hint ?? ""} ${o.keywords ?? ""}`).includes(q) ? 2 : -1;
    };
    return options
      .map((o) => ({ o, r: rank(o) }))
      .filter((x) => x.r >= 0)
      .sort((a, b) => a.r - b.r)
      .map((x) => x.o);
  }, [options, query, searchable]);

  const openMenu = useCallback(
    (initial?: "first" | "last") => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (rect) setDropUp(window.innerHeight - rect.bottom < 300 && rect.top > window.innerHeight - rect.bottom);
      const current = options.findIndex((o) => o.value === value);
      setActive(initial === "last" ? options.length - 1 : initial === "first" ? 0 : Math.max(current, 0));
      setQuery("");
      setOpen(true);
    },
    [options, value]
  );

  const close = useCallback((refocus = true) => {
    setOpen(false);
    setQuery("");
    if (refocus) triggerRef.current?.focus();
  }, []);

  const choose = useCallback(
    (opt: SelectOption) => {
      if (controlled === undefined) setUncontrolled(opt.value);
      onChange?.(opt.value);
      setInvalid(false);
      close();
    },
    [close, controlled, onChange]
  );

  // Close when clicking or focusing outside
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, close]);

  useEffect(() => {
    if (open && searchable) searchRef.current?.focus();
  }, [open, searchable]);

  // Keep the highlighted option in view
  useEffect(() => {
    if (!open || active < 0) return;
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  function move(delta: number) {
    if (!visible.length) return;
    setActive((i) => Math.min(visible.length - 1, Math.max(0, (i < 0 ? 0 : i) + delta)));
  }

  function onTypeahead(key: string) {
    const t = typeahead.current;
    clearTimeout(t.timer);
    t.text += key.toLowerCase();
    t.timer = setTimeout(() => (t.text = ""), 600);
    const start = open ? active + 1 : options.findIndex((o) => o.value === value) + 1;
    const ordered = [...options.slice(start), ...options.slice(0, start)];
    const match = ordered.find((o) => normalize(o.label).startsWith(normalize(t.text)));
    if (!match) return;
    const idx = options.indexOf(match);
    if (open) setActive(idx);
    else choose(match);
  }

  function onKeyDown(e: KeyboardEvent<HTMLElement>) {
    const fromSearch = e.currentTarget === searchRef.current;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) openMenu();
        else move(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) openMenu();
        else move(-1);
        break;
      case "Home":
        if (open && !fromSearch) {
          e.preventDefault();
          setActive(0);
        }
        break;
      case "End":
        if (open && !fromSearch) {
          e.preventDefault();
          setActive(visible.length - 1);
        }
        break;
      case "Enter":
      case " ":
        if (fromSearch && e.key === " ") return; // let people type spaces
        e.preventDefault();
        if (!open) openMenu();
        else if (visible[active]) choose(visible[active]);
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          close();
        }
        break;
      case "Tab":
        if (open) close(false);
        break;
      default:
        if (!fromSearch && e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) onTypeahead(e.key);
    }
  }

  const activeId = open && visible[active] ? `${listId}-${visible[active].value}` : undefined;

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={searchable ? undefined : activeId}
        aria-label={ariaLabel}
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={onKeyDown}
        className={
          triggerClassName ??
          `input flex items-center justify-between gap-3 text-left ${open ? "border-primary ring-4 ring-primary/10" : ""} ${
            invalid ? "border-primary ring-4 ring-primary/15" : ""
          }`
        }
      >
        <span className={`flex min-w-0 items-center gap-2 truncate ${selected ? "text-ink" : "text-ink-soft"}`}>
          {selected ? (
            renderValue ? (
              renderValue(selected)
            ) : (
              <>
                {selected.icon}
                <span className="truncate">{selected.label}</span>
              </>
            )
          ) : (
            placeholder
          )}
        </span>
        <ChevronDown size={16} className={`shrink-0 text-ink-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Carries the value for form submission and native required validation */}
      {name !== undefined && (
        <input
          tabIndex={-1}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-4 h-px w-px opacity-0"
          name={name}
          value={value}
          required={required}
          onChange={() => {}}
          onInvalid={(e) => {
            e.preventDefault();
            setInvalid(true);
            triggerRef.current?.focus();
          }}
        />
      )}
      {invalid && (
        <p className="mt-1.5 text-xs font-medium text-primary" role="alert">
          Please choose an option.
        </p>
      )}

      <div
        className={`absolute z-40 min-w-full overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-navy/10 transition duration-150 ${
          dropUp ? "bottom-full mb-2 origin-bottom" : "top-full mt-2 origin-top"
        } ${open ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"} ${menuClassName}`}
      >
        {searchable && (
          <div className="border-b border-navy/5 p-2">
            <label className="relative block">
              <span className="sr-only">{searchPlaceholder}</span>
              <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
              <input
                ref={searchRef}
                type="text"
                role="searchbox"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                aria-controls={listId}
                aria-activedescendant={activeId}
                placeholder={searchPlaceholder}
                className="w-full rounded-lg bg-cream py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-primary/20"
                tabIndex={open ? 0 : -1}
              />
            </label>
          </div>
        )}
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={triggerId}
          className="max-h-64 overflow-y-auto overscroll-contain p-1.5"
        >
          {/* Options render only while open: keeps pages light and avoids server/client
              differences in locale data (e.g. Intl country names) during hydration. */}
          {open && visible.length === 0 && <li className="px-3 py-6 text-center text-sm text-ink-muted">No matches</li>}
          {open && visible.map((opt, i) => {
            const isSelected = opt.value === value;
            return (
              <li
                key={opt.value}
                id={`${listId}-${opt.value}`}
                data-index={i}
                role="option"
                aria-selected={isSelected}
                onPointerEnter={() => setActive(i)}
                onPointerDown={(e) => e.preventDefault()} // keep focus on the trigger/search
                onClick={() => choose(opt)}
                className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] transition-colors ${
                  i === active ? "bg-cream text-navy" : "text-ink"
                } ${isSelected ? "font-semibold" : ""}`}
              >
                {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                <span className="min-w-0 flex-1 truncate">{opt.label}</span>
                {opt.hint && <span className="shrink-0 text-sm text-ink-muted">{opt.hint}</span>}
                <Check size={16} className={`shrink-0 text-primary ${isSelected ? "opacity-100" : "opacity-0"}`} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
