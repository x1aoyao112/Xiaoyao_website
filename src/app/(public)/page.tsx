import Link from "next/link";
import { ArrowDown, ArrowUpRight, BookOpen, MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eyebrow, SectionHeading } from "@/components/ui/typography";

export default function HomePage() {
  return (
    <main id="main-content" className="page-shell">
      <section className="grid items-center gap-14 pt-16 pb-20 sm:pt-24 lg:grid-cols-[1.6fr_1fr] lg:gap-16 lg:pb-28">
        <div>
          <Eyebrow className="mb-8 text-muted-foreground">
            {"Xiaoyao's corner of the internet"}
          </Eyebrow>
          <h1 className="display text-editorial">
            {"A work in "}
            <br />
            progress.
          </h1>
          <p className="body-copy mt-8 min-h-21 max-w-md text-muted-foreground sm:min-h-14">
            {
              "A little about what I do, what I like, and what I'm figuring out along the way."
            }
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Button asChild className="min-w-48 justify-between">
              <Link href="#perspective">
                A little perspective <ArrowDown aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative lg:pt-10">
          <Card
            tone="powder"
            className="relative min-h-80 overflow-hidden p-8 pb-16 sm:min-h-96 sm:p-10 sm:pb-16"
          >
            <Eyebrow>A note to myself</Eyebrow>
            <div
              aria-hidden="true"
              className="mx-auto my-9 grid h-28 w-32 grid-cols-[5rem_3rem] items-center justify-center"
            >
              <span className="font-serif text-9xl">x</span>
              <ArrowUpRight className="size-12 self-start" />
            </div>
            <p className="max-w-64 text-2xl leading-snug font-medium">
              Some things are worth figuring out.
            </p>
          </Card>
          <span className="absolute -right-2 -bottom-5 -rotate-6 w-64 rounded-xl bg-butter px-5 py-4 text-center text-sm font-medium text-navy sm:right-5">
            Made with too many open tabs.
          </span>
        </div>
      </section>
      <section
        id="perspective"
        className="border-t border-border pt-12 sm:pt-16"
      >
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="The perspective"
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
