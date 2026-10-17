"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Field,
  Input,
  Select,
  Textarea,
  Checkbox,
} from "@/components/ui/form-controls";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

export function ComponentSandbox() {
  const [focus, setFocus] = useState(65);
  const [title, setTitle] = useState("Make room for curiosity");
  const [tone, setTone] = useState<"butter" | "powder">("butter");
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <h3 className="text-xl font-medium tracking-tight">
          Small details. Clear interactions.
        </h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          A component sandbox. Changes only affect this preview and are not
          saved.
        </p>
        <div className="mt-7 space-y-6">
          <Field
            id="preview-title"
            label="Card title"
            hint="A short thought for the sample card."
          >
            <Input
              id="preview-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={60}
              aria-describedby="preview-title-hint"
            />
          </Field>
          <Field id="preview-tone" label="Surface">
            <Select
              id="preview-tone"
              value={tone}
              onChange={(event) => setTone(event.target.value as typeof tone)}
            >
              <option value="butter">Butter yellow</option>
              <option value="powder">Powder blue</option>
            </Select>
          </Field>
          <Field
            id="preview-note"
            label="A little context"
            hint="Preview only. Do not enter personal information."
          >
            <Textarea
              id="preview-note"
              aria-describedby="preview-note-hint"
              placeholder="Leave a thought here…"
            />
          </Field>
          <label className="flex items-center gap-3 text-sm">
            <Checkbox defaultChecked /> Keep a little space for the unexpected
          </label>
          <div className="flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  Open dialog <ArrowUpRight aria-hidden="true" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle className="pr-8 text-2xl font-medium tracking-tight">
                  Clarity in every detail.
                </DialogTitle>
                <DialogDescription className="mt-4 text-sm leading-6 text-muted-foreground">
                  A focused space for a decision. This is a component preview;
                  nothing is saved or connected to an account.
                </DialogDescription>
                <div className="mt-8 flex justify-end">
                  <DialogClose asChild>
                    <Button>
                      Got it <Check aria-hidden="true" />
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" disabled>
              Unavailable
            </Button>
          </div>
        </div>
      </Card>
      <Card tone={tone} className="flex flex-col justify-between gap-12">
        <div>
          <Badge tone="neutral">Interactive preview</Badge>
          <h3 className="mt-8 break-words font-serif text-4xl leading-tight">
            {title.trim() || "A thought in progress"}
          </h3>
          <p className="mt-5 max-w-sm text-sm leading-6">
            A calm surface. A clear next step. A little room to think.
          </p>
        </div>
        <div className="space-y-6">
          <Progress value={focus} label="Sample progress" />
          <div>
            <label
              htmlFor="preview-progress"
              className="block text-sm font-medium"
            >
              Adjust sample progress
            </label>
            <input
              id="preview-progress"
              type="range"
              min="0"
              max="100"
              value={focus}
              onChange={(event) => setFocus(Number(event.target.value))}
              className="mt-3 min-h-11 w-full accent-navy"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
