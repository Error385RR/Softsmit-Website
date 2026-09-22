export type NavItem = { label: string; href: string };

export type Service = {
  hidden?: boolean;
  id: string;
  title: string;
  summary: string;
  capabilities: string[];
  example: string;
};

export type ProcessStep = { title: string; description: string; detail: string; hidden?: boolean };

export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
  featured?: boolean;
  hidden?: boolean;
};

export type Principle = { title: string; description: string };

export type Testimonial = { id: string; quote: string; author: string; role?: string; business?: string };

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  technologies: string[];
  images: { src: string; alt: string }[];
  url?: string;
  date: string;
  featured?: boolean;
};

export type AboutPerson = { name?: string; role?: string; bio?: string };

export type AboutContent = {
  title: string;
  intro: string;
  philosophy: { title: string; paragraphs: string[] };
  approach: { title: string; items: Principle[] };
  behind: { title: string; fallback: string; person: AboutPerson };
  capabilitiesTitle: string;
};

/** The parts of the About page the owner can edit from the dashboard. */
export type AboutEditable = {
  intro: string;
  paragraphs: string[];
  approachItems: Principle[];
  person: AboutPerson;
};
