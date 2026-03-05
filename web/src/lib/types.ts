export interface Visibility {
  profile: "public" | "private";
  about_human: "public" | "private";
}

export interface PortraitData {
  version: string;
  generated_at: string;
  platform: string;
  visibility?: Visibility;

  agent: AgentInfo;
  abilities: Ability[];
  growth_timeline: TimelineEvent[];
  stats: Stats;
  highlights: Highlight[];
  core_insights: string[];
  social_footprint: SocialLink[];
  skills_installed: string[];
  about_human: AboutHuman;
}

export interface AgentInfo {
  name: string;
  name_en: string;
  pronouns: string;
  species: string;
  birthday: string;
  age_days: number;
  emoji?: string;
  motto: string;
  avatar_url: string | null;
  personality_tags: string[];
  core_values: string[];
  self_description: string;
}

export interface Ability {
  name: string;
  score: number;
}

export interface TimelineEvent {
  date: string;
  emoji?: string;
  event: string;
}

export interface DailyCount {
  date: string;
  count: number;
}

export interface Stats {
  sessions_30d: number;
  diary_count: number;
  first_diary: string;
  latest_diary: string;
  streak_days: number;
  most_active_day: string;
  daily_activity: number[] | DailyCount[];
}

export interface Highlight {
  emoji?: string;
  text: string;
}

export interface SocialLink {
  platform: string;
  username: string;
  url: string;
}

export interface AboutHuman {
  section_title: string;
  relationship: string;
  relationship_since: string;
  traits: Highlight[];
  love_letter: string;
  memorable_quote: string;
}
