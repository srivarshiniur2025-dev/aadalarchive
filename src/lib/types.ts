export type UserType =
  | "dancer"
  | "choreographer"
  | "teacher"
  | "photographer"
  | "costume_designer"
  | "makeup_artist"
  | "jewelry_designer"
  | "enthusiast";

export type Privacy =
  | "private"
  | "public"
  | "unlisted"
  | "invite_only"
  | "group_only";

export type ContentType =
  | "image"
  | "video"
  | "poster"
  | "album"
  | "board"
  | "choreography";

export type Interest =
  | "poses"
  | "abhinaya"
  | "mudras"
  | "costumes"
  | "jewelry"
  | "makeup"
  | "choreography"
  | "rehearsal"
  | "stage_design"
  | "photography"
  | "event_albums"
  | "classical_videos";

export type AlbumSection =
  | "inspiration"
  | "preparation"
  | "rehearsal"
  | "costume"
  | "makeup"
  | "backstage"
  | "on_stage"
  | "audience"
  | "after";

export type ProjectStatus =
  | "concept"
  | "research"
  | "choreography"
  | "rehearsal"
  | "revision"
  | "performance_ready"
  | "archived";

export type NoteCategory =
  | "movement"
  | "timing"
  | "expression"
  | "formation"
  | "music"
  | "costume"
  | "teacher";

export type CreditLabel =
  | "personal_reference"
  | "do_not_copy"
  | "educational"
  | "public_sharing"
  | "credit_required"
  | "no_downloads"
  | "view_permission"
  | "original"
  | "traditional"
  | "adaptation";

export interface Credits {
  creator?: string;
  photographer?: string;
  choreographer?: string;
  dancer?: string;
  guru?: string;
  composer?: string;
  vocalist?: string;
  nattuvangam?: string;
  source?: string;
  labels: CreditLabel[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  handle: string;
  avatar: string;
  danceForm: string;
  location: string;
  bio: string;
  artisticStatement: string;
  userType: UserType;
  interests: Interest[];
  website?: string;
  socials?: { label: string; url: string }[];
}

export interface FeedItem {
  id: string;
  title: string;
  description: string;
  type: ContentType;
  mediaUrl: string;
  mediaType: "image" | "video";
  aspect: "portrait" | "landscape" | "square" | "tall";
  creator: { id: string; name: string; handle: string };
  danceForm: string;
  category: string;
  credits: Credits;
  tags: string[];
  saved?: boolean;
  liked?: boolean;
}

export interface Board {
  id: string;
  title: string;
  description: string;
  cover: string;
  privacy: Privacy;
  itemIds: string[];
  tags: string[];
  collaborative: boolean;
  notes: Record<string, string>;
}

export interface Album {
  id: string;
  name: string;
  date: string;
  venue: string;
  location: string;
  danceForm: string;
  description: string;
  cover: string;
  privacy: Privacy;
  category: string;
  sections: AlbumSection[];
  itemIds: string[];
  contributors: string[];
}

export interface ChoreographyVideo {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  poster: string;
  danceForm: string;
  composition: string;
  choreographer: string;
  dancers: string[];
  guru: string;
  music: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  tags: string[];
  privacy: Privacy;
  allowDownload: boolean;
  notes: TimestampNote[];
  relatedBoardIds: string[];
  relatedAlbumIds: string[];
}

export interface TimestampNote {
  id: string;
  time: number;
  text: string;
  category: NoteCategory;
  author: string;
  private: boolean;
}

export interface StudioProject {
  id: string;
  title: string;
  status: ProjectStatus;
  description: string;
  cover: string;
  collaborators: string[];
  referenceImageIds: string[];
  videoIds: string[];
  notes: string[];
}

export interface NotificationItem {
  id: string;
  type: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
}
