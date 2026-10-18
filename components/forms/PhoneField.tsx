"use client";
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";
import Select, { type SelectOption } from "./Select";

/** Countries most of our members and visitors use, shown first. */
const PINNED: CountryCode[] = ["US", "NG", "GB", "CA"];

const flag = (code: string) => String.fromCodePoint(...[...code].map((c) => 0x1f1a5 + c.charCodeAt(0)));

function useCountryOptions(): SelectOption[] {
  return useMemo(() => {
    const names = new Intl.DisplayNames(["en"], { type: "region" });
    const toOption = (code: CountryCode): SelectOption => {
      const dial = `+${getCountryCallingCode(code)}`;
      return {
        value: code,
        label: names.of(code) ?? code,
        hint: dial,
        keywords: `${code} ${dial} ${dial.slice(1)}`,
        icon: <span className="text-lg leading-none">{flag(code)}</span>,
      };
    };
    const rest = getCountries()
      .filter((c) => !PINNED.includes(c))
      .map(toOption)
      .sort((a, b) => a.label.localeCompare(b.label));
    return [...PINNED.map(toOption), ...rest];
  }, []);
}

type PhoneFieldProps = {
  label: string;
  name: string;
  required?: boolean;
  full?: boolean;
  defaultCountry?: CountryCode;
  hint?: string;
};

/**
 * International phone input: searchable country picker, as-you-type formatting and validation
 * via libphonenumber-js. Submits the number in E.164 format (e.g. +16158336135).
 */
export default function PhoneField({ label, name, required, full, defaultCountry = "US", hint }: PhoneFieldProps) {
  const options = useCountryOptions();
  const [country, setCountry] = useState<CountryCode>(defaultCountry);
  const [display, setDisplay] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const id = `phone-${name}`;

  const parsed = display ? parsePhoneNumberFromString(display, country) : undefined;
  const e164 = parsed?.number ?? "";

  function problem(text = display, c = country) {
    if (!text.trim()) return required ? "Please enter your phone number." : "";
    if (isValidPhoneNumber(text, c)) return "";
    const name = options.find((o) => o.value === c)?.label ?? c;
    return `Please enter a valid ${name} phone number.`;
  }

  // Keep native form validation in sync so an invalid number can't be submitted.
  useEffect(() => {
    inputRef.current?.setCustomValidity(problem());
  });

  function onInput(e: ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const deleting = (e.nativeEvent as InputEvent).inputType?.startsWith("delete");
    // A full international number (typed or pasted) picks its own country.
    if (raw.trim().startsWith("+")) {
      const intl = parsePhoneNumberFromString(raw);
      if (intl?.country) {
        // Calling codes like +1 and +44 are shared; prefer the selected or a pinned country.
        const familiar = [country, ...PINNED];
        const detected = familiar.includes(intl.country)
          ? intl.country
          : (familiar.find(
              (c) => getCountryCallingCode(c) === intl.countryCallingCode && isValidPhoneNumber(intl.nationalNumber, c)
            ) ?? intl.country);
        setCountry(detected);
        setDisplay(parsePhoneNumberFromString(intl.nationalNumber, detected)?.formatNational() ?? intl.formatNational());
        setError("");
        return;
      }
    }
    // Reformatting while deleting fights the cursor, so only format when adding characters.
    setDisplay(deleting ? raw : new AsYouType(country).input(raw));
    if (error) setError("");
  }

  function onCountry(code: string) {
    const c = code as CountryCode;
    setCountry(c);
    const digits = display.replace(/\D/g, "");
    setDisplay(digits ? new AsYouType(c).input(digits) : "");
    if (display) setError(problem(digits, c));
    inputRef.current?.focus();
  }

  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="label">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <div
        className={`flex items-stretch rounded-xl border bg-white transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 ${
          error ? "border-primary ring-4 ring-primary/15" : "border-navy/10"
        }`}
      >
        <Select
          options={options}
          value={country}
          onChange={onCountry}
          searchable
          searchPlaceholder="Search country or code…"
          aria-label="Country code"
          menuClassName="w-80 max-w-[calc(100vw-2.5rem)]"
          triggerClassName="flex h-full items-center gap-1.5 rounded-l-xl border-r border-navy/10 pl-3.5 pr-2.5 text-sm text-ink transition hover:bg-cream focus:outline-none focus-visible:bg-cream"
          renderValue={(o) => (
            <>
              {o.icon}
              <span className="font-medium text-ink-muted">{o.hint}</span>
            </>
          )}
        />
        <input
          ref={inputRef}
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={display}
          onChange={onInput}
          onBlur={() => display && setError(problem())}
          onInvalid={() => setError(problem())}
          required={required}
          placeholder={country === "US" ? "(615) 555-0123" : "Phone number"}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className="min-w-0 flex-1 rounded-r-xl bg-transparent px-4 py-3 text-[15px] text-ink placeholder:text-ink-soft focus:outline-none"
        />
      </div>
      {/* The submitted value, in international format */}
      <input type="hidden" name={name} value={e164 || display} />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-primary" role="alert">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-soft">
            {hint}
          </p>
        )
      )}
    </div>
  );
}
