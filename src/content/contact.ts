/**
 * Verified public contact details. NONE are published yet — publishing an
 * unverified phone number or address would be worse than an honest empty
 * state, so each field is null until the team confirms it from an official
 * source. The UI renders a "verification pending" notice for nulls.
 */
export interface ContactInfo {
  officeAddress: { bn: string; en: string } | null;
  phone: string | null;
  email: string | null;
  officeHours: { bn: string; en: string } | null;
  mapEmbedUrl: string | null;
  mapLink: string | null;
  socials: { id: string; label: string; url: string | null }[];
}

export const contactInfo: ContactInfo = {
  officeAddress: null,
  phone: null,
  email: null,
  officeHours: null,
  mapEmbedUrl: null,
  mapLink: null,
  socials: [
    { id: "facebook", label: "Facebook", url: null },
    { id: "youtube", label: "YouTube", url: null },
    { id: "x", label: "X (Twitter)", url: null },
    { id: "website", label: "Personal website", url: null },
  ],
};
