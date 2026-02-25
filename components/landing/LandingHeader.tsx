"use client";

import Link from "next/link";
import Image from "next/image";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-bg px-6">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo.svg"
          alt="Gunnu.ai"
          width={36}
          height={36}
          className="h-9 w-9"
        />
        <span className="text-lg font-semibold tracking-tight">Gunnu.ai</span>
      </Link>
      <nav className="hidden items-center gap-6 md:flex md:gap-8">
        <a href="#problem" className="text-sm text-muted-foreground hover:text-primary">
          Problem
        </a>
        <a href="#solution" className="text-sm text-muted-foreground hover:text-primary">
          Solution
        </a>
        <a href="#features" className="text-sm text-muted-foreground hover:text-primary">
          Features
        </a>
        <a href="/get-started#use-cases" className="text-sm text-muted-foreground hover:text-primary">
          Use Cases
        </a>
        <a href="#testimonials" className="text-sm text-muted-foreground hover:text-primary">
          Testimonials
        </a>
        <Link
          href="/get-started"
          className="rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-70"
        >
          Get Started
        </Link>
      </nav>
      <Link
        href="/get-started"
        className="rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-70 md:hidden"
      >
        Get Started
      </Link>
    </header>
  );
}
