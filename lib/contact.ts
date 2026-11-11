// Central contact info for Su.En. Studio. contact-form.tsx and
// cta-projects.tsx both read from here, so there's one place to
// update the studio's details and one mailto template.

export const STUDIO_CONTACT = {
  name: "Su.En. Studio",
  email: "studio.su.en@gmail.com",
  phone: "+91 89433 33119",
  address: "P.O. Perinthalmanna, Malappuram, Kerala, PIN 679322",
  location: "Kerala & Bangalore",
  founded: 2017,
} as const;

const MAILTO_SUBJECT = "New Project Inquiry — Su.En. Studio";

const MAILTO_BODY = `Hi Su.En. Studio,

I'd like to talk about a project. A few details to start:

Name:
Location:
Project type (residential / interiors / other):
Rough timeline:

Looking forward to hearing from you.`;

export function buildContactMailto(): string {
  const subject = encodeURIComponent(MAILTO_SUBJECT);
  const body = encodeURIComponent(MAILTO_BODY);
  return `mailto:${STUDIO_CONTACT.email}?subject=${subject}&body=${body}`;
}