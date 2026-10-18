"use client";
import FormShell from "@/components/forms/FormShell";
import PhoneField from "@/components/forms/PhoneField";
import { TextField, SelectField, TextAreaField } from "@/components/forms/Fields";

export default function ContactForm() {
  return (
    <FormShell
      submitLabel="Send message"
      successTitle="Message received!"
      successText="Thank you for reaching out. A member of our team will get back to you within two working days."
    >
      <TextField label="Full name" name="name" required autoComplete="name" />
      <TextField label="Email" name="email" type="email" required autoComplete="email" />
      <PhoneField label="Phone" name="phone" />
      <SelectField label="Subject" name="subject" options={["General enquiry", "I'm new / visiting", "Ministries & serving", "Weddings & dedications", "Media & Agape TV", "Other"]} required />
      <TextAreaField label="Message" name="message" required />
    </FormShell>
  );
}
