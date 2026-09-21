import type { ProcessStep } from "./types";

export const processSteps: ProcessStep[] = [
  { title: "Tell us what you need", description: "Describe your idea or problem in your own words. No technical language needed.", detail: "Use the quote form, WhatsApp or email. Tell us what your business does and what you want to solve. A rough idea is enough, and you don't need to know what technology is involved." },
  { title: "Discuss the requirements", description: "We ask questions to understand how your business works and what you actually need.", detail: "We ask practical questions about your customers, how you work today and what a good result looks like. If something isn't necessary, or isn't a good idea, we say so plainly." },
  { title: "Define the solution", description: "We agree what will be built and give you a quote based on that scope.", detail: "We describe what will be built in plain language and give you a quote based on that scope, so you know what you are getting and what it costs before work starts." },
  { title: "Build and refine", description: "We build it and share progress so you can give feedback along the way.", detail: "We build in stages you can review, and adjust based on your feedback so the result fits how your business actually works." },
  { title: "Test", description: "We check that everything works properly before it goes live.", detail: "We test on real devices and browsers and check the details before anything goes live." },
  { title: "Launch", description: "We put it live and make sure it works as expected.", detail: "We put it live and check that everything works as expected. If you want to expand it later, we can build on what is already there." },
];
