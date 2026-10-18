"use client";
import FormShell from "@/components/forms/FormShell";
import PhoneField from "@/components/forms/PhoneField";
import { TextField, SelectField, TextAreaField, CheckboxField } from "@/components/forms/Fields";

export default function VisitForm() {
  return (
    <FormShell
      submitLabel="Let us know you're coming"
      successTitle="We can't wait to meet you!"
      successText="Thank you for letting us know. A member of our welcome team will reach out before Sunday and look out for you at the door."
    >
      <TextField label="First name" name="firstName" required autoComplete="given-name" />
      <TextField label="Last name" name="lastName" autoComplete="family-name" />
      <TextField label="Email" name="email" type="email" required autoComplete="email" />
      <PhoneField label="Phone" name="phone" />
      <SelectField label="When are you planning to visit?" name="date" options={["This Sunday", "Next Sunday", "Wednesday midweek (Zoom)", "Not sure yet"]} required />
      <SelectField label="How many are coming?" name="party" options={["Just me", "2", "3", "4", "5+"]} />
      <CheckboxField label="I'm bringing children and would like info on Children's Church" name="kids" />
      <TextAreaField label="Anything we should know?" name="notes" rows={3} placeholder="Accessibility needs, questions, prayer…" />
    </FormShell>
  );
}
