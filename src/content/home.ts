import type { Principle } from "./types";

export const homeContent = {
  hero: {
    headline: "Affordable digital solutions for small businesses.",
    body: "Softsmith is an independent software studio. We build websites, custom tools and automation that fit your business, without agency overhead or unnecessary complexity.",
  },
  audience: {
    title: "Software that solves an actual problem",
    intro: "You don't need a large agency or a complicated system. Softsmith helps small businesses with practical problems such as:",
    problems: [
      "Customers can't quickly see what you offer or how to reach you.",
      "Enquiries are scattered across WhatsApp, email and phone calls.",
      "The same manual tasks take up time every week.",
      "The tools you use don't work together.",
    ],
  },
  servicesTitle: "What we can build",
  whyTitle: "Why Softsmith",
  principles: [
    { title: "Practical", description: "We start from the problem you need solved, not from technology for its own sake." },
    { title: "Affordable", description: "Right-sized solutions and custom quotes based on what you actually need." },
    { title: "Tailored", description: "Built around how your business works, not squeezed into a template." },
    { title: "Efficient", description: "Simple, focused solutions that get you to a working result without waste." },
    { title: "Direct communication", description: "You talk to the person building your solution, in plain language." },
    { title: "Simple by default", description: "We add complexity only when your business genuinely needs it." },
  ] satisfies Principle[],
  processTitle: "How working together goes",
  faqTitle: "Common questions",
  finalCta: {
    title: "Tell us what you need",
    body: "Describe your idea or problem in your own words. We will help you work out the simplest way to solve it.",
  },
} as const;
