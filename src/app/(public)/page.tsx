import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eyebrow, SectionHeading } from "@/components/ui/typography";

import { profile } from "@/content/profile";
import {
  publicProjects,
  publicJournal,
  publicCurrently,
} from "@/content/public";
import { ProjectCard, ArticleCard } from "@/components/portfolio/content-cards";
import { TextLink } from "@/components/portfolio/text-link";
import { safeExternalUrl } from "@/lib/content";

export default function HomePage() {
  const featured = publicProjects
    .filter((project) => project.featured)
    .slice(0, 3);
  const articles = publicJournal.slice(0, 3);
  return (
    <main id="main-content" className="page-shell [&>section:last-child]:pb-0">
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
        className="grid gap-7 border-t border-border py-14 sm:py-20 md:grid-cols-[1fr_1.5fr] md:gap-14"
      >
        <h2 className="section-title text-editorial">A little about me</h2>
        <div className="max-w-xl">
          <p className="body-copy text-muted-foreground">
            {profile.introduction}
          </p>
          <div className="mt-5">
            <TextLink href="/about">More about me</TextLink>
          </div>
        </div>
      </section>
      {featured.length > 0 && (
        <section className="border-t border-border py-14 sm:py-20">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
            <SectionHeading title="Selected work" />
            <TextLink href="/work">View all work</TextLink>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} heading="h3" />
            ))}
          </div>
        </section>
      )}
      {articles.length > 0 && (
        <section className="border-t border-border py-14 sm:py-20">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
            <SectionHeading title="From the Journal" />
            <TextLink href="/journal">Visit the Journal</TextLink>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((entry) => (
              <ArticleCard key={entry.slug} entry={entry} heading="h3" />
            ))}
          </div>
        </section>
      )}
      {publicCurrently.length > 0 && (
        <section className="border-t border-border py-14 sm:py-20">
          <SectionHeading title="Currently" />
          <dl className="mt-8 grid gap-8 md:grid-cols-2">
            {publicCurrently.map((note) => (
              <div key={note.label}>
                <dt className="font-medium">{note.label}</dt>
                <dd className="mt-3 text-sm leading-7 text-muted-foreground">
                  {note.text}
                  {note.link &&
                    note.link.label.trim() &&
                    safeExternalUrl(note.link.url) && (
                      <a
                        href={safeExternalUrl(note.link.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 block underline underline-offset-4"
                      >
                        {note.link.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </main>
  );
}
