// data/skillData.ts

export type SkillDetail = {
  name: string;
  icon: string;
  description: string;
  notesUrl: string;
};

export const skillDetails: Record<string, SkillDetail> = {
  "skill-react": {
    name: "React",
    icon: "/photos/logoreact.png",
    description:
      "Proficient in building interactive UIs, managing complex state with Context/Redux, and optimizing performance with hooks.",
    notesUrl: "#",
  },
  "skill-nextjs": {
    name: "Next.js",
    icon: "/photos/logonext.png",
    description:
      "Experience with App Router, Server Actions, SSR/SSG, and building full-stack applications with SEO optimization.",
    notesUrl: "#",
  },
  "skill-typescript": {
    name: "TypeScript",
    icon: "/photos/logotypescript.png",
    description:
      "Strong understanding of static typing, interfaces, generics, and type safety to build robust and scalable codebases.",
    notesUrl: "#",
  },
  "skill-javascript": {
    name: "JavaScript",
    icon: "/photos/logojavascript.jpg",
    description:
      "Deep knowledge of ES6+ syntax, asynchronous programming (Promises/Async-Await), and DOM manipulation.",
    notesUrl: "www.google.com",
  },
  "skill-html": {
    name: "HTML5",
    icon: "/photos/logohtml.jpg",
    description:
      "Expertise in semantic markup, accessibility standards (WCAG), and modern HTML5 APIs.",
    notesUrl: "#",
  },
  "skill-css": {
    name: "CSS3",
    icon: "/photos/logocss.jpg",
    description:
      "Skilled in Flexbox, Grid, Animations, and using frameworks like Tailwind CSS for responsive designs.",
    notesUrl: "#",
  },
  "skill-vite": {
    name: "Vite",
    icon: "/photos/logovite.jpg",
    description:
      "Experience setting up blazing fast development environments and optimizing build configurations.",
    notesUrl: "#",
  },
};
