import { notFound } from "next/navigation";

// Fail closed everywhere until server-side authentication and authorization exist.
// Never replace this with a client-side check or an environment-variable toggle.
export default function PrivateLayout({ children: _children }: { children: React.ReactNode }) {
  void _children;
  notFound();
}
