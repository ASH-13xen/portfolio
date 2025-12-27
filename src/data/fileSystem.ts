// data/fileSystem.ts

export type FileSystemItem = {
  id: string;
  parentId: string | null;
  name: string;
  type: "folder" | "file";
  icon: string; // Path to the specific icon
};

export const fileSystem: Record<string, FileSystemItem> = {
  // --- ROOT (Desktop) ---
  desktop: {
    id: "desktop",
    parentId: null,
    name: "Desktop",
    type: "folder",
    icon: "/photos/iconfolder.png",
  },

  // --- LEVEL 1 (Directly on Desktop) ---
  "my-projects": {
    id: "my-projects",
    parentId: "desktop",
    name: "My Projects",
    type: "folder",
    icon: "/photos/iconfolder.png",
  },
  "my-skills": {
    id: "my-skills",
    parentId: "desktop",
    name: "My Skills",
    type: "folder",
    icon: "/photos/iconskills.png",
  },
  "research-work": {
    id: "research-work",
    parentId: "desktop",
    name: "Research Work",
    type: "folder",
    icon: "/photos/iconres.png",
  },
  certifications: {
    id: "certifications",
    parentId: "desktop",
    name: "Certifications",
    type: "folder",
    icon: "/photos/iconcertificate.png",
  },
  achievements: {
    id: "achievements",
    parentId: "desktop",
    name: "Victories",
    type: "folder",
    icon: "/photos/iconvictory.png",
  },
  contact: {
    id: "contact",
    parentId: "desktop",
    name: "Contact Me",
    type: "folder",
    icon: "/photos/iconphone.png",
  },

  // --- LEVEL 2 (Inside My Projects) ---
  musichat: {
    id: "musichat",
    parentId: "my-projects",
    name: "musichat",
    type: "folder",
    icon: "/photos/musichat_logo.png",
  },
  SircuS: {
    id: "SircuS",
    parentId: "my-projects",
    name: "SircuS",
    type: "folder",
    icon: "/photos/icontent.png",
  },
  DFB: {
    id: "DFB",
    parentId: "my-projects",
    name: "DFB",
    type: "folder",
    icon: "/photos/logodfb.png",
  },
  "contact-mail": {
    id: "contact-mail",
    parentId: "contact",
    name: "Mail Me",
    type: "file",
    icon: "/photos/iconmail.jpg",
  },

  "skill-react": {
    id: "skill-react",
    parentId: "my-skills",
    name: "React",
    type: "file", // Treat as file to open dialog
    icon: "/photos/iconreact.png",
  },
  "skill-nextjs": {
    id: "skill-nextjs",
    parentId: "my-skills",
    name: "Next.js",
    type: "file",
    icon: "/photos/iconnextjs.png",
  },
  "skill-typescript": {
    id: "skill-typescript",
    parentId: "my-skills",
    name: "TypeScript",
    type: "file",
    icon: "/photos/icontypescript.png",
  },
  "skill-javascript": {
    id: "skill-javascript",
    parentId: "my-skills",
    name: "JavaScript",
    type: "file",
    icon: "/photos/iconjavascript.png",
  },
  "skill-html": {
    id: "skill-html",
    parentId: "my-skills",
    name: "HTML5",
    type: "file",
    icon: "/photos/iconhtml.png",
  },
  "skill-css": {
    id: "skill-css",
    parentId: "my-skills",
    name: "CSS3",
    type: "file",
    icon: "/photos/iconcss.png",
  },
  "skill-vite": {
    id: "skill-vite",
    parentId: "my-skills",
    name: "Vite",
    type: "file",
    icon: "/photos/iconvite.png",
  },

  // "cert-aws": {
  //   id: "cert-aws",
  //   parentId: "certifications",
  //   name: "AWS Certified Cloud Practitioner",
  //   type: "file",
  //   icon: "/photos/iconfolder.png",
  // },

  // --- LEVEL 2 (Inside Victories/Achievements) ---
  "vic-hackathon": {
    id: "vic-hackathon",
    parentId: "achievements",
    name: "Hack-A-Sol",
    type: "file",
    icon: "/photos/logohackasol.png",
  },
};

// Helper: Get all items that belong to a specific parent
export const getFolderContents = (parentId: string) => {
  return Object.values(fileSystem).filter((item) => item.parentId === parentId);
};

// Helper: Build the breadcrumb path from current folder up to desktop
export const getBreadcrumbs = (currentId: string) => {
  const path = [];
  let current = fileSystem[currentId];

  while (current) {
    path.unshift(current);
    if (!current.parentId) break;
    current = fileSystem[current.parentId];
  }
  return path;
};
