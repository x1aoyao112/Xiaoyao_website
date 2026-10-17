"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { publicNavigation } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="page-shell">
      <div className="flex min-h-24 items-center justify-between gap-4 border-b border-border">
        <Link
          href="/"
          aria-label="The Xiaoyao System home"
          className="flex items-center gap-2 sm:gap-3"
        >
          <span
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-xl text-primary-foreground"
          >
            x.
          </span>
          <span className="text-[10px] font-semibold whitespace-nowrap tracking-[0.02em] sm:text-xs">
            THE XIAOYAO SYSTEM
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-6">
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-7 md:flex"
          >
            {publicNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "ui-transition text-xs hover:text-foreground",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <div className="md:hidden">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation"
                >
                  <Menu aria-hidden="true" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle className="section-title pr-8">
                  Find your way.
                </DialogTitle>
                <DialogDescription className="mt-3 text-sm text-muted-foreground">
                  A little perspective. A considered design language.
                </DialogDescription>
                <nav
                  aria-label="Mobile navigation"
                  className="mt-8 flex flex-col gap-2"
                >
                  {publicNavigation.map((item) => (
                    <DialogClose key={item.href} asChild>
                      <Link
                        href={item.href}
                        aria-current={
                          pathname === item.href ? "page" : undefined
                        }
                        className="rounded-xl px-4 py-4 text-lg hover:bg-muted"
                      >
                        {item.label}
                      </Link>
                    </DialogClose>
                  ))}
                </nav>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  );
}
