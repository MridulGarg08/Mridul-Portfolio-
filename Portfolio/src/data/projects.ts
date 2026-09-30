export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  image?: string;
  imageAlt?: string;
}

export const projectsData: Project[] = [
  {
    id: "devflow",
    title: "DevFlow Studio",
    description: "A developer analytics dashboard for monitoring real-time server health, build pipelines, and latency metrics across distributed microservices.",
    tags: ["TypeScript", "React", "Node.js", "WebSockets", "CSS Variables"],
    liveUrl: "https://example.com/devflow",
    githubUrl: "https://github.com/alexchen-dev/devflow-studio",
    featured: true,
    image: "/projects/devflow.jpg",
    imageAlt: "DevFlow Studio dashboard showing real-time system metrics and code analytics"
  },
  {
    id: "microstream",
    title: "MicroStream Engine",
    description: "Lightweight API Gateway & service map observer with automated health probing, low latency route handling, and visual service topology map.",
    tags: ["Go", "TypeScript", "Astro", "Docker", "REST API"],
    liveUrl: "https://example.com/microstream",
    githubUrl: "https://github.com/alexchen-dev/microstream-engine",
    featured: true,
    image: "/projects/microstream.jpg",
    imageAlt: "MicroStream API monitor showing active microservice topology map and network health"
  },
  {
    id: "marksmith",
    title: "MarkSmith CLI & Static Engine",
    description: "A zero-dependency Markdown documentation generator designed for fast static site generation with instant search indexing.",
    tags: ["Node.js", "TypeScript", "Markdown", "Static Analysis"],
    liveUrl: "https://example.com/marksmith",
    githubUrl: "https://github.com/alexchen-dev/marksmith-cli",
    featured: false
  },
  {
    id: "cachecraft",
    title: "CacheCraft Redis Proxy",
    description: "In-memory caching middleware that optimizes database query loads with intelligent LRU cache eviction and key invalidation hooks.",
    tags: ["Python", "Redis", "FastAPI", "Docker"],
    liveUrl: "https://example.com/cachecraft",
    githubUrl: "https://github.com/alexchen-dev/cachecraft-proxy",
    featured: false
  },
  {
    id: "aura-ui",
    title: "Aura UI Component Specs",
    description: "An accessible, framework-agnostic CSS component system adhering strictly to WCAG 2.1 AA standards and fluid container queries.",
    tags: ["CSS Custom Properties", "Vanilla JS", "HTML5", "Accessibility"],
    liveUrl: "https://example.com/aura-ui",
    githubUrl: "https://github.com/alexchen-dev/aura-ui-system",
    featured: false
  }
];
