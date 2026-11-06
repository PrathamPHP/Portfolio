export const profile = {
  name: "Pratham Pratap Singh",
  university: "REVA University",
  github: "https://github.com/PrathamPHP",
  description: "The Art of Becoming is the portfolio of Pratham Pratap Singh, a first-year BCA AI & ML student at REVA University exploring code, games, and creative technology.",
};

type Project = {
  slug: string;
  name: string;
  artwork: string;
  assetFolder: string;
  screenshot: string;
  artworkTitle: string;
  artworkDescription: string;
  stack?: readonly string[];
  description?: string;
  repository?: string;
  demo?: string;
};

export const projects: readonly Project[] = [
  {
    slug: "agriqueue", name: "AgriQueue", artwork: "agriqueue.svg", assetFolder: "agriqueue", screenshot: "agriqueue.webp",
    artworkTitle: "Field lines", artworkDescription: "Topographic lines sweep past a low gold disc in a study of land and rhythm.",
  },
  {
    slug: "chainshield-ai", name: "Chainshield AI", artwork: "chainshield.svg", assetFolder: "chainshield", screenshot: "chainshield-ai.webp",
    artworkTitle: "Interlock", artworkDescription: "Three metallic links overlap on a drafting grid in a study of repetition and structure.",
  },
  {
    slug: "inbox-guard-ai", name: "Inbox Gaurd AI", artwork: "inbox.svg", assetFolder: "inbox-guard", screenshot: "inbox-guard-ai.webp",
    artworkTitle: "Signal study", artworkDescription: "Offset waveforms converge and separate in a study of frequency and interference.",
  },
];

export const skills = [
  { title: "Languages", items: ["Python", "C", "JavaScript", "TypeScript"], description: "From low-level fundamentals to ideas I can bring into the browser." },
  { title: "Frontend", items: ["HTML", "React"], description: "Structure and components for the experiences people see and use." },
  { title: "Data", items: ["PostgreSQL"], description: "A relational foundation for organizing application data." },
];

export const events = [
  { name: "Smart India Hackathon", context: "Participated in SIH.", photo: "sih.webp", label: "Hackathon" },
  { name: "SAP Hackfest", context: "Participated at New Horizon College after being among the top 10 teams from REVA University.", photo: "sap-hackfest.webp", label: "Hackathon" },
  { name: "Hackathon 3.0", context: "Participated in Solve for Society at REVA University.", photo: "hackathon-3.webp", label: "Hackathon", certificate: "hackathon-3" },
  { name: "Break the Firewall CTF", context: "Participated in the Capture the Flag competition organized by Kristu Jayanti Institute of Technology.", photo: "break-the-firewall.webp", label: "CTF", certificate: "firewall-ctf" },
];
