import fs from "fs";
import path from "path";

const dataDir = process.env.DATA_DIR ?? path.join(process.cwd(), "data");

function readJson<T>(filename: string): T {
  const filePath = path.join(dataDir, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function writeJson<T>(filename: string, data: T): void {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// --- Types ---

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  city: string;
  description: string;
  images: string[];
  year: number;
}

export interface AgendaItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  description: string;
  registrationUrl: string;
  status: "upcoming" | "past";
  banner: string;
  mercadoPagoId: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image: string;
  published: boolean;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  url: string;
  tier: "gold" | "silver" | "bronze";
}

export interface MediaItem {
  id: string;
  outlet: string;
  title: string;
  date: string;
  url: string;
  type: "magazine" | "podcast" | "tv" | "blog";
  outletLogo: string;
  image: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  area: string;
  city: string;
  state: string;
  source: string;
  message: string;
  createdAt: string;
}

// --- CRUD helpers ---

export const db = {
  events: {
    getAll: () => readJson<Event[]>("events.json"),
    save: (data: Event[]) => writeJson("events.json", data),
  },
  agenda: {
    getAll: () => readJson<AgendaItem[]>("agenda.json"),
    save: (data: AgendaItem[]) => writeJson("agenda.json", data),
  },
  blog: {
    getAll: () => readJson<BlogPost[]>("blog.json"),
    save: (data: BlogPost[]) => writeJson("blog.json", data),
  },
  sponsors: {
    getAll: () => readJson<Sponsor[]>("sponsors.json"),
    save: (data: Sponsor[]) => writeJson("sponsors.json", data),
  },
  media: {
    getAll: () => readJson<MediaItem[]>("media.json"),
    save: (data: MediaItem[]) => writeJson("media.json", data),
  },
  members: {
    getAll: () => readJson<Member[]>("members.json"),
    save: (data: Member[]) => writeJson("members.json", data),
  },
};

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
