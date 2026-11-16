import { notFound } from "next/navigation";

/** Catch-all so unknown multi-segment paths render the localized 404. */
export default function CatchAllPage() {
  notFound();
}
