/** Domain model for the public information site. Every fact carries a
 *  verification status; unverified items render with a visible badge and
 *  are never presented as established fact. */

export type VerificationStatus = "pending" | "verified";

export interface Verifiable {
  verification: VerificationStatus;
  sourceUrl?: string;
  sourceLabel?: { bn: string; en: string };
  /** ISO date of last fact-check / edit */
  updatedAt?: string;
}

export interface LocalText {
  bn: string;
  en: string;
}

export interface TimelineItem extends Verifiable {
  id: string;
  date: string | LocalText; // ISO or display precision date or localized label
  title: LocalText;
  body: LocalText;
}

export type ParliamentCategory =
  | "speech"
  | "question"
  | "bill"
  | "committee"
  | "responsibility";

export interface ParliamentActivity extends Verifiable {
  slug: string;
  date: string;
  category: ParliamentCategory;
  title: LocalText;
  excerpt: LocalText;
  body: LocalText[]; // paragraphs
  session?: LocalText;
}

export type InitiativeStatus = "planned" | "ongoing" | "completed";

export interface Initiative extends Verifiable {
  slug: string;
  category: { bn: string; en: string };
  status: InitiativeStatus;
  location: LocalText;
  title: LocalText;
  excerpt: LocalText;
  body: LocalText[];
  startDate?: string;
  updates: { date: string; text: LocalText }[];
}

export type NewsCategory =
  | "parliament"
  | "constituency"
  | "initiative"
  | "media"
  | "announcement";

export interface NewsArticle extends Verifiable {
  slug: string;
  date: string;
  category: NewsCategory;
  featured?: boolean;
  title: LocalText;
  excerpt: LocalText;
  body: LocalText[];
}

export interface Speech extends Verifiable {
  id: string;
  date: string;
  subject: LocalText;
  title: LocalText;
  location?: LocalText;
  /** Empty/undefined until a verified recording is attached */
  videoUrl?: string;
  durationMinutes?: number;
  transcript?: LocalText[];
}

export type EventStatus = "upcoming" | "past";

export interface PublicEvent extends Verifiable {
  id: string;
  title: LocalText;
  date: string; // ISO
  endDate?: string;
  time?: LocalText;
  location: LocalText;
  description: LocalText;
  status: EventStatus;
  category?: LocalText;
}

export interface Publication extends Verifiable {
  id: string;
  date: string;
  category: LocalText;
  title: LocalText;
  description: LocalText;
  fileUrl?: string;
}

export type MediaKind = "photo" | "video" | "interview" | "speech" | "event";

export interface MediaItem extends Verifiable {
  id: string;
  kind: MediaKind;
  title: LocalText;
  date: string;
  /** YouTube embed id — only set for verified uploads */
  youtubeId?: string;
  imageUrl?: string;
  /** Multiple photos for photo album / slider */
  images?: string[];
  caption?: LocalText;
}

export type RequestStatus = "received" | "underReview" | "referred" | "closed";

export interface CitizenRequestRecord {
  ref: string;
  name: string;
  phone: string;
  union?: string;
  category: string;
  subject: string;
  description: string;
  attachmentPath?: string;
  attachmentName?: string;
  status: RequestStatus;
  createdAt: string;
  statusHistory: { status: RequestStatus; at: string }[];
}
