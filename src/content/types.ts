export type NavItem = { label: string; href: string };

export type Service = {
  id: string;
  title: string;
  summary: string;
  capabilities: string[];
  example: string;
};

export type ProcessStep = { title: string; description: string; detail: string };

export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
  featured?: boolean;
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
