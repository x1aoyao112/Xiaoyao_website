import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Compass,
  MoveUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eyebrow, SectionHeading } from "@/components/ui/typography";

export default function HomePage() {
  return (
    <main id="main-content" className="page-shell">
      <section className="grid items-center gap-14 pt-16 pb-20 sm:pt-24 lg:grid-cols-[1.6fr_1fr] lg:gap-16 lg:pb-28">
        <div>
          <Eyebrow className="mb-8 flex items-center gap-3 text-muted-foreground">
            <span className="size-1.5 rounded-full bg-editorial" /> A personal
            operating system
          </Eyebrow>
          <h1 className="display text-editorial">
            A life built
            <br />
            with{" "}
            <span className="font-serif font-normal italic">intention.</span>
          </h1>
          <p className="body-copy mt-8 max-w-md text-muted-foreground">
            Curious about business. Inspired by technology.
            <br className="hidden sm:block" /> Building a thoughtful life, one
            idea at a time.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Button asChild>
              <Link href="#perspective">
                A little perspective <ArrowDown aria-hidden="true" />
              </Link>
            </Button>
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
              ALWAYS A STUDENT.
            </span>
          </div>
        </div>
        <div className="relative lg:pt-10">
          <Card
            tone="powder"
            className="relative min-h-80 overflow-hidden p-8 pb-16 sm:min-h-96 sm:p-10 sm:pb-16"
          >
            <div className="flex justify-between">
              <Eyebrow>Notes to self / 001</Eyebrow>
              <Compass aria-hidden="true" className="size-5" />
            </div>
            <div
              aria-hidden="true"
              className="my-9 flex h-28 items-center justify-center"
            >
              <span className="font-serif text-9xl italic tracking-tighter">
                x
              </span>
              <ArrowUpRight className="size-12 self-start" />
            </div>
            <p className="max-w-60 text-2xl leading-tight tracking-tight">
              Stay curious.
              <br />
              Think clearly.
              <br />
              Make something matter.
            </p>
            <div className="mt-8 border-t border-navy/25 pt-4 font-mono text-[10px] tracking-widest">
              LEARNING → BUILDING → BECOMING
            </div>
          </Card>
          <span className="absolute -right-2 -bottom-5 -rotate-6 rounded-xl bg-butter px-5 py-4 font-serif text-lg italic text-navy sm:right-5">
            A little ambition, a lot of possibility.
          </span>
        </div>
      </section>
      <section
        id="perspective"
        className="border-t border-border pt-12 sm:pt-16"
      >
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="01 / The perspective"
            title="Serious about possibilities."
            description="A student mindset. An analytical eye. Room for a life beyond the spreadsheet."
          />
          <MoveUpRight
            aria-hidden="true"
            className="hidden size-8 text-editorial sm:block"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card
            tone="butter"
            className="flex min-h-80 flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <Eyebrow>Curiosity, first.</Eyebrow>
              <BookOpen aria-hidden="true" className="size-5" />
            </div>
            <div className="mt-12">
              <h3 className="text-3xl tracking-tight">
                More questions.
                <br />
                Better perspectives.
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-6">
                Exploring the intersections of business, finance, and technology
                — and learning to connect the dots.
              </p>
            </div>
          </Card>
          <Card
            tone="powder"
            className="flex min-h-80 flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <Eyebrow>Intention, always.</Eyebrow>
              <ArrowUpRight aria-hidden="true" className="size-5" />
            </div>
            <div className="mt-12">
              <h3 className="text-3xl tracking-tight">
                A clear head.
                <br />
                An open horizon.
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-6">
                Space to study deeply, build thoughtfully, and enjoy the
                everyday. Ambition with a sense of balance.
              </p>
            </div>
          </Card>
        </div>
      </section>
      <section className="mt-16 flex flex-wrap items-center justify-between gap-8 rounded-card border border-border p-6 sm:p-10">
        <div>
          <Eyebrow className="mb-3 text-muted-foreground">
            02 / Made with intention
          </Eyebrow>
          <h2 className="text-2xl tracking-tight">
            A system with a point of view.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Warmth in the details. Clarity in the structure.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/design-system">
            Explore the design language <ArrowUpRight aria-hidden="true" />
          </Link>
        </Button>
      </section>
    </main>
  );
}
