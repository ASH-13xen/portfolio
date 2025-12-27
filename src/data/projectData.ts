// data/projectData.ts

export type ProjectDetail = {
  icon: ProjectDetail;
  title: string;
  description: string;
  url: string;
  themeColor?: string;
};

// Keys MUST match the IDs in your fileSystem.ts
export const projectDetails: Record<string, ProjectDetail> = {
  musichat: {
    title: "MusiChat",
    description:
      "Musichat is a social-first music streaming platform that bridges the gap between audio playback and real-time connection. It allows users to build personal profiles, chat with friends, and view live listening activity, creating a shared interactive musical experience.",
    url: "https://musichat.onrender.com",
    themeColor: "blue",
  },
  SircuS: {
    title: "SircuS - Skill Tracker",
    description:
      "Sircus is a gamified skill-tracking platform designed to enhance the college learning experience. It combines user profiles and competitive leaderboards with a comprehensive suite of learning tools—including training, testing, and practice modes. The platform also features a secure interview system equipped with robust anti-cheat functionality to ensure assessment integrity.",
    url: "https://sircus-next-phi.vercel.app/",
    themeColor: "orange",
  },
  DFB: {
    title: "Dynamic Form Builder using Airtable",
    description:
      "A dynamic data collection tool that leverages Airtable as a backend database. The system goes beyond static inputs by implementing complex branching logic, allowing the application to serve unique form flows depending on previous answers. This ensures users only see relevant fields while maintaining organized data synchronization with Airtable.",
    url: "https://dynamicformbuilder-sigma.vercel.app/",
    themeColor: "orange",
  },
};
