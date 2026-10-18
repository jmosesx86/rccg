"use client";
import FormShell from "@/components/forms/FormShell";
import PhoneField from "@/components/forms/PhoneField";
import { TextField, TextAreaField } from "@/components/forms/Fields";

export default function JoinForm({ ministry }: { ministry: string }) {
  return (
    <FormShell
      submitLabel={`Join ${ministry}`}
      successTitle="Welcome aboard!"
      successText={`Thank you for your interest in ${ministry}. A leader will contact you soon with next steps.`}
    >
      <input type="hidden" name="ministry" value={ministry} />
      <TextField label="Full name" name="name" required autoComplete="name" />
      <TextField label="Email" name="email" type="email" required autoComplete="email" />
      <PhoneField label="Phone" name="phone" full />
      <TextAreaField label="Tell us a little about yourself" name="about" rows={3} />
    </FormShell>
  );
}
