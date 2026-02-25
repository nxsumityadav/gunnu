import { LandingHeader } from "@/components/landing/LandingHeader";
import { GetStartedForm } from "@/components/landing/GetStartedForm";
import { UseCasesSection } from "@/components/landing/UseCasesSection";

export default function GetStartedPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <LandingHeader />
      <main className="flex-1">
        <GetStartedForm />
        <UseCasesSection />
      </main>
    </div>
  );
}
