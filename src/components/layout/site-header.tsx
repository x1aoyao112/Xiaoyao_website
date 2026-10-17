"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import {
  publicNavigation,
  recruiterNavigation,
  isActivePath,
} from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { BrandMark } from "@/components/layout/brand-mark";
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
  const navClass = (href: string) =>
    cn(
      "ui-transition inline-flex min-h-11 items-center text-sm hover:text-foreground",
      isActivePath(pathname, href)
        ? "font-medium text-foreground underline decoration-border underline-offset-8"
        : "text-muted-foreground",
    );
  return (
    <header className="page-shell">
      <div className="flex min-h-24 items-center justify-between gap-3 border-b border-border">
        <Link
          href="/"
          aria-label={`${siteConfig.name} home`}
          className="flex items-center gap-2 sm:gap-3"
        >
          <BrandMark />
          <span className="text-sm font-medium whitespace-nowrap sm:text-base">
            {siteConfig.name}
          </span>
        </Link>
        <div className="flex items-center gap-1 lg:gap-5">
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-5 lg:flex"
          >
            {publicNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={
                  isActivePath(pathname, item.href) ? "page" : undefined
                }
                className={navClass(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href={recruiterNavigation.href}
            aria-current={
              isActivePath(pathname, recruiterNavigation.href)
                ? "page"
                : undefined
            }
            className={cn(
              navClass(recruiterNavigation.href),
              "hidden border-l border-border pl-5 lg:inline-flex",
            )}
          >
            {recruiterNavigation.label}
          </Link>
          <ThemeToggle />
          <div className="lg:hidden">
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
                  {siteConfig.name}
                </DialogTitle>
                <DialogDescription className="mt-3 text-sm text-muted-foreground">
                  Work, notes, and a little about Xiaoyao.
                </DialogDescription>
                <nav
                  aria-label="Mobile navigation"
                  className="mt-6 flex flex-col"
                >
                  {[...publicNavigation, recruiterNavigation].map((item) => (
                    <DialogClose key={item.href} asChild>
                      <Link
                        href={item.href}
                        aria-current={
                          isActivePath(pathname, item.href) ? "page" : undefined
                        }
                        className={cn(
                          "rounded-xl px-4 py-3 text-base hover:bg-muted",
                          isActivePath(pathname, item.href) &&
                            "bg-muted font-medium",
                          item.href === "/recruiter" &&
                            "mt-3 border-t border-border",
                        )}
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
