export type AppMode = 'markhor' | 'skyronix' | 'general' | 'research' | 'competition';

export interface Participant {
  id: number;
  name: string;
  image: string | null;
}

export interface CompetitionData {
  title: string;
  mainHeading: string;
  subHeading: string;
  participants: Participant[];
  bottomDescription: string;
  timerText: string;
  footerWebsite: string;
  footerPhone: string;
  footerEmail: string;
  logo: string | null;
  aspectRatio: '1/1' | '4/5' | '9/16';
}

export interface MarkhorData {
  personImage: string | null;
  content: string;
  logo: string | null;
  topRightLogo: string | null;
  optionalTopText: string;
  aspectRatio: '1/1' | '4/5' | '9/16';
}

export interface SkyronixPoint {
  title: string;
  description: string;
  iconType: 'shield' | 'diamond' | 'star' | 'rocket' | 'check' | 'lightbulb';
}

export interface SkyronixData {
  userImage: string | null;
  name: string;
  description: string;
  content: string;
  title?: string;
  subHeadline?: string;
  points?: SkyronixPoint[];
  summary?: string;
  aspectRatio: '1/1' | '4/5' | '9/16';
  brandLogo: string | null;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  image?: string | null;
}

export interface GeneralData {
  messages: ChatMessage[];
  lastInput: string;
  isImagePending: boolean;
}

export interface ResearchDay {
  day: number;
  theme: string;
  postContent: string;
  idea: string;
}

export interface ResearchData {
  topic: string;
  plan: ResearchDay[];
  status: 'idle' | 'generating' | 'completed' | 'error';
}
