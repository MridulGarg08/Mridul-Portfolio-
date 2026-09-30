export interface PersonalInfo {
  name: string;
  role: string;
  oneLiner: string;
  bio: string;
  location: string;
  availability: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
    twitter?: string;
  };
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights?: string[];
}

export const personalData: PersonalInfo = {
  name: "Alex Chen",
  role: "Full-Stack Software Engineer",
  oneLiner: "I build fast, accessible web applications and reliable distributed backend systems.",
  bio: "Engineers clean web experiences with a focus on performance, intuitive user experience, and robust architecture. Specializing in TypeScript, React, Astro, Node.js, and cloud systems. Always open to discussing new technical challenges and collaborative projects.",
  location: "San Francisco, CA (or Remote)",
  availability: "Available for full-time roles & select consulting",
  links: {
    github: "https://github.com/alexchen-dev",
    linkedin: "https://linkedin.com/in/alexchen-dev",
    email: "alex.chen.dev@example.com"
  }
};

export const skillsData: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript (ESNext)", "Python", "Go", "HTML5", "CSS3 / Modern CSS", "SQL"]
  },
  {
    category: "Frameworks & UI",
    skills: ["React", "Astro", "Next.js", "Node.js", "Express", "Tailwind CSS", "Web Components"]
  },
  {
    category: "Tools & Cloud",
    skills: ["Git & GitHub", "Docker", "PostgreSQL", "Redis", "AWS / Vercel", "Vite", "CI/CD Pipelines", "REST & GraphQL APIs"]
  }
];

export const experienceData: ExperienceItem[] = [
  {
    role: "Senior Full-Stack Engineer",
    company: "CloudScale Systems",
    period: "2023 — Present",
    description: "Architecting high-throughput telemetry analytics tools and responsive web management dashboards. Scaled API throughput while maintaining sub-100ms response times.",
    highlights: ["Reduced bundle size by 42% through AST optimization and code splitting", "Implemented real-time WebSocket metrics visualizer"]
  },
  {
    role: "Frontend Engineer",
    company: "Nexus Labs",
    period: "2021 — 2023",
    description: "Led frontend development for a collaborative workspace tool used by over 50k active daily users. Focused on web performance, accessibility, and dynamic state management.",
    highlights: ["Achieved 99+ Lighthouse performance & accessibility scores across core web apps", "Mentored 4 junior engineers and authored team style guide"]
  },
  {
    role: "Software Developer",
    company: "DataPulse Solutions",
    period: "2019 — 2021",
    description: "Built full-stack internal web applications and REST APIs using Python, PostgreSQL, and modern JavaScript.",
    highlights: ["Migrated legacy server-rendered apps to decoupled modern API architecture"]
  }
];
