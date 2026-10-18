"use client";
import FormShell from "@/components/forms/FormShell";
import PhoneField from "@/components/forms/PhoneField";
import { TextField, SelectField, TextAreaField } from "@/components/forms/Fields";

export default function CounsellingForm() {
  return (
    <FormShell
      submitLabel="Request a session"
      successTitle="Request received"
      successText="Thank you. Our pastoral care team will contact you privately to arrange a time that works for you."
    >
      <TextField label="Full name" name="name" required autoComplete="name" />
      <PhoneField label="Phone" name="phone" required />
      <TextField label="Email" name="email" type="email" required autoComplete="email" full />
      <SelectField label="Type of counselling" name="type" required options={["Personal / spiritual", "Marriage", "Pre-marital", "Family & parenting", "Grief & loss", "Other"]} />
      <SelectField label="Preferred format" name="format" options={["In person", "Phone call", "Video call"]} />
      <SelectField label="Best time to reach you" name="time" options={["Weekday mornings", "Weekday afternoons", "Weekday evenings", "Weekends"]} full />
      <TextAreaField label="Briefly, how can we help?" name="details" rows={4} hint="Please don't include anything you're not comfortable sharing in writing." />
    </FormShell>
  );
}
