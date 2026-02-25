"use client";

import Link from "next/link";
import Image from "next/image";
import { Settings } from "lucide-react";

export function Header() {
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
      <button
        type="button"
        className="flex items-center gap-2 text-muted-foreground hover:text-primary"
        aria-label="Settings"
      >
        <Settings className="h-5 w-5" />
      </button>
    </header>
  );
}
