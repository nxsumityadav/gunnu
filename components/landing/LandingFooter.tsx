import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="px-6 py-12">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 md:flex-row">
        <span className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Gunnu.ai. All rights reserved.
        </span>
        <div className="flex gap-8">
          <a href="#problem" className="text-sm text-muted-foreground hover:text-primary">
            Problem
          </a>
          <a href="#solution" className="text-sm text-muted-foreground hover:text-primary">
            Solution
          </a>
          <a href="#features" className="text-sm text-muted-foreground hover:text-primary">
            Features
          </a>
          <Link href="/get-started#use-cases" className="text-sm text-muted-foreground hover:text-primary">
            Use Cases
          </Link>
          <a href="#testimonials" className="text-sm text-muted-foreground hover:text-primary">
            Testimonials
          </a>
          <Link href="/get-started" className="text-sm text-muted-foreground hover:text-primary">
            Get Started
          </Link>
        </div>
      </div>
    </footer>
  );
}
