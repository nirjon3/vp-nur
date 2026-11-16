import type { LocalText, Verifiable } from "./content";

export interface ConstituencyPriority extends Verifiable {
  id: string;
  title: LocalText;
  body: LocalText;
}

export interface Constituency {
  id: string;
  name: LocalText;
  upazilas: LocalText[];
  overview: LocalText;
  geography: LocalText;
  unions: LocalText[];
  priorities: ConstituencyPriority[];
  mapEmbed: string;
  mapLink: string;
  verification: "pending" | "verified";
}
