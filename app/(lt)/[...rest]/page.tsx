import { notFound } from "next/navigation";

// Any unknown URL in this language renders the localized not-found page
// (inside the site header and footer) with a real 404 status.
export default function CatchAll() {
  notFound();
}
