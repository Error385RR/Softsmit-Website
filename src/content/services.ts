import type { Service } from "./types";

export const services: Service[] = [
  {
    id: "websites-ecommerce",
    title: "Websites & E-commerce",
    summary:
      "Business websites, landing pages and online stores that show clearly what you offer and make it easy for customers to get in touch or buy.",
    capabilities: ["Business websites", "Landing pages", "Online stores", "Updates to existing websites"],
    example:
      "A small business needs a website that clearly presents its services and makes WhatsApp contact easy.",
  },
  {
    id: "web-apps-software",
    title: "Web Applications & Software",
    summary:
      "Small custom applications and internal tools built around one specific need of your business.",
    capabilities: ["Custom web applications", "Internal business tools", "Small custom software"],
    example:
      "A business tracks requests in spreadsheets and wants one simple tool its team can use instead.",
  },
  {
    id: "automation-integrations",
    title: "Automation & Integrations",
    summary:
      "Automate repetitive work, add WhatsApp workflows and connect the systems you already use.",
    capabilities: ["Business automation", "WhatsApp bots and integrations", "API integrations", "Connecting existing systems"],
    example:
      "A business wants customer enquiries to arrive in one place instead of being copied between apps by hand.",
  },
  {
    id: "custom-solutions",
    title: "Custom Solutions",
    summary:
      "Problems that don't fit a ready-made package. Describe what you need and we will work out what makes sense.",
    capabilities: ["Digital tools for specific problems", "Advice on the simplest workable approach"],
    example: "A business has an unusual need and isn't sure whether software is the right answer.",
  },
];
