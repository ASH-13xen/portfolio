export type VictoryDetail = {
  icon: string;
  eventName: string;
  rank: string;
  date: string;
  description: string;
  proofUrl: string; // Image or blog post link
};

export const victoryDetails: Record<string, VictoryDetail> = {
  "vic-hackathon": {
    icon: "/photos/logohackasol.png",
    eventName: "Hack-A-Sol",
    rank: "1st Place - Web Track",
    date: "Nov 2025",
    description:
      "Developed 'NeuroLink', a web companion for Alzheimer's care. Competed against 50+ teams.",
    proofUrl: "/photos/startmenubg.png",
  },
};
