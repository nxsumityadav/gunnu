import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee";

const testimonials = [
  {
    author: {
      name: "Founder",
      handle: "B2B SaaS",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    text: "Finally, a tool that validates before I build. Saved me weeks of wrong assumptions.",
  },
  {
    author: {
      name: "Indie hacker",
      handle: "@indiehacker",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    text: "The market research is real—Reddit threads, Product Hunt, actual data. Not generic AI fluff.",
  },
  {
    author: {
      name: "Product manager",
      handle: "@pm",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    text: "The 8 questions adapt to my idea. Felt like talking to a PM who actually gets it.",
  },
];

export function TestimonialSection() {
  return (
    <TestimonialsSection
      id="testimonials"
      title="What founders say"
      description="Real feedback from founders and builders who validated before they built."
      testimonials={testimonials}
    />
  );
}
