import type { Metadata } from "next";
import { ArrowUpRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BentoGrid, Card, DashboardWidget } from "@/components/ui/card";
import { Eyebrow, SectionHeading } from "@/components/ui/typography";
import { Progress } from "@/components/ui/progress";
import { MetricCard, FinancialTable } from "@/components/ui/financial";
import { EmptyState, LoadingState } from "@/components/ui/states";
import { ComponentSandbox } from "@/components/design-system/component-sandbox";

export const metadata: Metadata = {
  title: "Design language",
  description:
    "The color, typography, and component studies behind XY's Side Notes.",
  robots: { index: false, follow: false },
};

const swatches = [
  { name: "Butter yellow", hex: "#FFF0B8", className: "bg-butter text-navy" },
  { name: "Powder blue", hex: "#DCEBFA", className: "bg-powder text-navy" },
  {
    name: "Soft ivory",
    hex: "#FAF9F6",
    className: "bg-ivory text-navy border border-border",
  },
  { name: "Deep navy", hex: "#142D4E", className: "bg-navy text-ivory" },
  { name: "Golden yellow", hex: "#E9B949", className: "bg-gold text-navy" },
  { name: "Obsidian", hex: "#17191D", className: "bg-obsidian text-ivory" },
  { name: "Silver grey", hex: "#A5A7A9", className: "bg-silver text-obsidian" },
];

export default function DesignSystemPage() {
  return (
    <main
      id="main-content"
      className="page-shell space-y-20 pb-6 sm:space-y-28"
    >
      <section className="pt-16 sm:pt-24">
        <Eyebrow className="mb-7 text-muted-foreground">
          The signature / Design language 01
        </Eyebrow>
        <h1 className="display max-w-4xl text-editorial">
          Young in spirit.
          <br />
          Considered in detail.
        </h1>
        <p className="body-copy mt-8 max-w-xl text-muted-foreground">
          Editorial warmth meets analytical clarity. A shared visual language
          for a life of learning, building, and becoming.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          <Badge tone="highlight">Component library</Badge>
          <Badge tone="info">Light + dark</Badge>
          <Badge>Public design preview</Badge>
        </div>
        <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground">
          All figures and widgets below are illustrative samples, not personal
          data or live workspace features.
        </p>
      </section>
      <section aria-labelledby="palette-heading" className="space-y-8">
        <SectionHeading
          id="palette-heading"
          eyebrow="01 / Color"
          title="Warmth is part of the identity."
          description="Butter and blue take up space. Navy brings structure. Ivory gives everything room to breathe."
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {swatches.map((swatch) => (
            <div
              key={swatch.hex}
              className={`flex min-h-36 flex-col justify-between rounded-card p-5 ${swatch.className}`}
            >
              <span className="text-sm font-medium">{swatch.name}</span>
              <span className="mt-7 font-sans text-xs">{swatch.hex}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-8">
        <SectionHeading
          eyebrow="02 / Typography"
          title="Expressive headlines. Precise details."
          description="Switzer for clarity, Zodiak for editorial expression, and tabular numerals for information that needs to align."
        />
        <Card>
          <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
            <div>
              <Eyebrow className="mb-6 text-muted-foreground">
                Editorial / Display
              </Eyebrow>
              <p className="font-serif text-5xl leading-tight tracking-[-0.025em] sm:text-6xl">
                Think clearly.
                <br />
                Stay curious.
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <Eyebrow className="mb-2 text-muted-foreground">
                  Body / 16 · 28
                </Eyebrow>
                <p className="body-copy">
                  Good design leaves room for the things that matter.
                </p>
              </div>
              <div>
                <Eyebrow className="mb-2 text-muted-foreground">
                  Data / Tabular figures
                </Eyebrow>
                <p className="font-sans text-3xl tabular-nums">12,480.00</p>
              </div>
            </div>
          </div>
        </Card>
      </section>
      <section className="space-y-8">
        <SectionHeading
          eyebrow="03 / Actions"
          title="Quietly confident."
          description="A clear primary action, restrained secondary controls, and useful status labels."
        />
        <Card className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild>
              <a href="#sandbox">
                Explore the sandbox <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="#surfaces">View surfaces</a>
            </Button>
            <Button asChild variant="ghost">
              <a href="#states">View states</a>
            </Button>
            <Button asChild variant="accent" size="icon">
              <a href="#sandbox" aria-label="Explore component sandbox">
                <Plus aria-hidden="true" />
              </a>
            </Button>
            <Button disabled>Unavailable</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>Draft</Badge>
            <Badge tone="info">In progress</Badge>
            <Badge tone="highlight">Ready to review</Badge>
          </div>
        </Card>
      </section>
      <section id="surfaces" className="space-y-8">
        <SectionHeading
          eyebrow="04 / Surfaces & widgets"
          title="Different moods. One system."
          description="Welcoming daily spaces. Focused career tools. A precise financial lens. These are surface studies for future sections."
        />
        <BentoGrid>
          <DashboardWidget title="Academic HQ" label="Sample" tone="butter">
            <p className="font-serif text-3xl">
              A little further,
              <br />
              every day.
            </p>
            <p className="mt-4 text-sm leading-6">
              A bright, calm place for ideas to take shape.
            </p>
            <Progress
              value={72}
              label="Illustrative learning goal"
              className="mt-8"
            />
          </DashboardWidget>
          <DashboardWidget title="My Day" label="Sample" tone="powder">
            <p className="font-serif text-3xl">
              Room to focus.
              <br />
              Space to breathe.
            </p>
            <div className="mt-8 space-y-4 border-t border-navy/25 pt-5 text-sm">
              <p>01 / One meaningful priority</p>
              <p>02 / A moment of curiosity</p>
              <p>03 / Something just for you</p>
            </div>
          </DashboardWidget>
          <DashboardWidget title="Career Studio" label="Sample">
            <p className="text-3xl leading-tight tracking-tight">
              Turn possibility
              <br />
              into direction.
            </p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              An organized canvas for the next chapter. Polished, legible, and
              distinctly personal.
            </p>
            <div className="mt-8">
              <Badge tone="info">Surface study</Badge>
            </div>
          </DashboardWidget>
        </BentoGrid>
        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard
            tone="terminal"
            label="Sample balance / USD"
            value="$12,480"
            note="Illustrative figure · not a live account"
          />
          <MetricCard
            label="Sample monthly allocation"
            value="24.0%"
            note="Tabular figures · consistent alignment"
          />
          <Card className="flex flex-col justify-between gap-6">
            <Eyebrow className="text-muted-foreground">
              Recruiter & résumé
            </Eyebrow>
            <h3 className="text-2xl tracking-tight">
              Let the substance speak.
            </h3>
            <p className="text-sm leading-6 text-muted-foreground">
              Structured typography. Restrained motion. Credentials with room to
              breathe.
            </p>
          </Card>
        </div>
        <FinancialTable
          caption="Financial table / illustrative entries · USD"
          rows={[
            {
              id: "1",
              label: "Learning reserve",
              category: "Education",
              amount: 240,
              status: <Badge tone="info">Allocated</Badge>,
            },
            {
              id: "2",
              label: "Project budget",
              category: "Building",
              amount: 120,
              status: <Badge tone="highlight">Planned</Badge>,
            },
          ]}
        />
      </section>
      <section id="sandbox" className="space-y-8">
        <SectionHeading
          eyebrow="05 / Controls & dialogs"
          title="Designed to feel effortless."
          description="Real controls, visible labels, clear focus, and a dialog that supports keyboard navigation. Try a different surface or adjust the sample progress."
        />
        <ComponentSandbox />
      </section>
      <section id="states" className="space-y-8">
        <SectionHeading
          eyebrow="06 / In-between moments"
          title="Even the quiet states matter."
          description="A gentle loading rhythm. An empty canvas with a clear explanation. No unnecessary noise."
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <h3 className="mb-8 font-medium">Loading / component preview</h3>
            <LoadingState label="Illustrative loading skeleton" />
          </Card>
          <Card>
            <EmptyState
              title="A little space for what’s next."
              description="No entries yet. This is an example empty state, ready for future content."
            />
          </Card>
        </div>
      </section>
    </main>
  );
}
