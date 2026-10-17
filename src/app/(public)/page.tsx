import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-12">
      <header className="flex items-center justify-between border-b border-border pb-6">
        <span className="text-xs font-semibold tracking-[0.18em]">{siteConfig.name}</span>
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground">EST. 2026</span>
      </header>
      <section className="flex flex-1 flex-col justify-center py-24">
        <p className="mb-8 flex items-center gap-3 font-mono text-xs tracking-widest text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-foreground" /> FOUNDATION / SPRINT 01</p>
        <h1 className="max-w-4xl text-6xl font-medium leading-[1.05] tracking-[-0.06em] sm:text-8xl">A life built<br />with intention.</h1>
        <p className="mt-8 max-w-md text-base leading-7 text-muted-foreground">A personal operating system. A professional perspective. The foundation for what comes next.</p>
        <div className="mt-12 flex items-center gap-2 text-xs font-medium">In development <ArrowUpRight aria-hidden="true" size={14} /></div>
      </section>
      <footer className="flex justify-between border-t border-border pt-6 font-mono text-[10px] tracking-widest text-muted-foreground"><span>XIAOYAO / PERSONAL SYSTEM</span><span>01 — FOUNDATION</span></footer>
    </main>
  );
}
