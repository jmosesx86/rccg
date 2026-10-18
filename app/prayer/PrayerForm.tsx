"use client";
import FormShell from "@/components/forms/FormShell";
import { TextField, SelectField, TextAreaField, CheckboxField } from "@/components/forms/Fields";

export default function PrayerForm() {
  return (
    <FormShell
      submitLabel="Submit prayer request"
      successTitle="We're praying with you"
      successText={
        <>
          Your request has been received by our prayer team. “Be careful for nothing; but in every thing by prayer and supplication
          with thanksgiving let your requests be made known unto God.” — Philippians 4:6
        </>
      }
    >
      <TextField label="Name" name="name" autoComplete="name" hint="Optional — you can stay anonymous." />
      <TextField label="Email" name="email" type="email" autoComplete="email" hint="Optional — if you'd like us to follow up." />
      <SelectField label="Prayer category" name="category" options={["Healing", "Family & relationships", "Finances & career", "Salvation", "Guidance", "Thanksgiving", "Other"]} full />
      <TextAreaField label="Your prayer request" name="request" required rows={6} placeholder="Share as much or as little as you'd like…" />
      <CheckboxField label="Keep this request confidential (shared only with the pastors)" name="confidential" defaultChecked />
      <CheckboxField label="I'd like a pastor to contact me" name="contactMe" />
    </FormShell>
  );
}
