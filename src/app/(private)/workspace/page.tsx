import { notFound } from "next/navigation";

// Defense in depth: do not add private data fetching before authentication exists.
export default function WorkspacePage() {
  notFound();
}
