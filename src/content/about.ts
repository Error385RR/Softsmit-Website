import type { AboutContent } from "./types";

/**
 * About page content. Everything here is editable.
 * `person` is intentionally empty: fill in name, role and bio when you are ready.
 * While empty, the About page shows a clearly marked placeholder in development only.
 */
export const aboutContent: AboutContent = {
  title: "About Softsmith",
  intro: "Softsmith is an independent software studio building practical digital solutions for small businesses.",
  philosophy: {
    title: "Our philosophy",
    paragraphs: [
      "Small businesses often need something simple and reliable, not a large system. Softsmith exists to build practical software at a reasonable cost, so a business doesn't need a large agency to solve a real problem.",
      "We work with small businesses with a particular focus on the UAE, and with clients internationally.",
    ],
  },
  approach: {
    title: "How we approach software",
    items: [
      { title: "Start with the problem", description: "We begin with what your business needs, not with a technology we want to use." },
      { title: "Keep it as simple as the problem allows", description: "Simple solutions are cheaper to build, easier to use and easier to change." },
      { title: "Explain things in plain language", description: "You shouldn't need to understand software to make good decisions about it." },
      { title: "Build so it can grow", description: "Start with what you need now, and leave room to expand it later." },
    ],
  },
  behind: {
    title: "Who is behind Softsmith",
    fallback: "Softsmith is run by an independent software developer who builds and delivers every project directly.",
    person: {},
  },
  capabilitiesTitle: "What we can build",
};
