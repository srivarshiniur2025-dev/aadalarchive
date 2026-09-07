export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          name: string;
          handle: string | null;
          avatar_url: string | null;
          bio: string | null;
          dance_form: string | null;
          location: string | null;
          website: string | null;
          artistic_statement: string | null;
          user_type: string | null;
          interests: string[];
          secondary_dance_forms: string[];
          current_project: string | null;
          experience_level: string | null;
          guru_name: string | null;
          socials: Json;
          portfolio_public: boolean;
          onboarding_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          name?: string;
          handle?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          dance_form?: string | null;
          location?: string | null;
          website?: string | null;
          artistic_statement?: string | null;
          user_type?: string | null;
          interests?: string[];
          secondary_dance_forms?: string[];
          current_project?: string | null;
          experience_level?: string | null;
          guru_name?: string | null;
          socials?: Json;
          portfolio_public?: boolean;
          onboarding_completed?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      creative_ideas: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          category: string;
          dance_form: string | null;
          source_context: string | null;
          related_queries: string[];
          related_image_url: string | null;
          board_id: string | null;
          ai_generated: boolean;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description: string;
          category: string;
          dance_form?: string | null;
          source_context?: string | null;
          related_queries?: string[];
          related_image_url?: string | null;
          board_id?: string | null;
          ai_generated?: boolean;
          metadata?: Json;
        };
        Update: Partial<Database["public"]["Tables"]["creative_ideas"]["Insert"]>;
      };
      boards: {
        Row: {
          id: string;
          owner_id: string;
          title: string;
          description: string | null;
          cover_url: string | null;
          privacy: string;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          title: string;
          description?: string | null;
          cover_url?: string | null;
          privacy?: string;
          tags?: string[];
        };
        Update: Partial<Database["public"]["Tables"]["boards"]["Insert"]>;
      };
      board_items: {
        Row: {
          id: string;
          board_id: string;
          added_by: string | null;
          provider: string | null;
          external_id: string | null;
          inspiration_id: string | null;
          title: string | null;
          image_url: string | null;
          source_url: string | null;
          note: string | null;
          position: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          board_id: string;
          added_by?: string | null;
          provider?: string | null;
          external_id?: string | null;
          inspiration_id?: string | null;
          title?: string | null;
          image_url?: string | null;
          source_url?: string | null;
          note?: string | null;
          position?: number;
        };
        Update: Partial<Database["public"]["Tables"]["board_items"]["Insert"]>;
      };
      inspiration_cache: {
        Row: {
          id: string;
          provider: string;
          external_id: string;
          title: string | null;
          image_url: string;
          thumbnail_url: string | null;
          source_url: string | null;
          creator_name: string | null;
          creator_url: string | null;
          category: string | null;
          tags: string[];
          width: number | null;
          height: number | null;
          attribution_required: boolean;
          license: string | null;
          query_key: string | null;
          metadata: Json;
          fetched_at: string;
        };
        Insert: {
          id?: string;
          provider: string;
          external_id: string;
          title?: string | null;
          image_url: string;
          thumbnail_url?: string | null;
          source_url?: string | null;
          creator_name?: string | null;
          creator_url?: string | null;
          category?: string | null;
          tags?: string[];
          width?: number | null;
          height?: number | null;
          attribution_required?: boolean;
          license?: string | null;
          query_key?: string | null;
          metadata?: Json;
        };
        Update: Partial<Database["public"]["Tables"]["inspiration_cache"]["Insert"]>;
      };
      saved_items: {
        Row: {
          id: string;
          user_id: string;
          provider: string;
          external_id: string;
          inspiration_id: string | null;
          title: string | null;
          image_url: string;
          source_url: string | null;
          creator_name: string | null;
          category: string | null;
          tags: string[];
          metadata: Json;
          saved_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          provider: string;
          external_id: string;
          inspiration_id?: string | null;
          title?: string | null;
          image_url: string;
          source_url?: string | null;
          creator_name?: string | null;
          category?: string | null;
          tags?: string[];
          metadata?: Json;
        };
        Update: Partial<Database["public"]["Tables"]["saved_items"]["Insert"]>;
      };
      albums: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          event_type: string;
          event_date: string | null;
          venue: string | null;
          location: string | null;
          dance_form: string | null;
          description: string | null;
          cover_url: string | null;
          privacy: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          event_type?: string;
          event_date?: string | null;
          venue?: string | null;
          location?: string | null;
          dance_form?: string | null;
          description?: string | null;
          cover_url?: string | null;
          privacy?: string;
        };
        Update: Partial<Database["public"]["Tables"]["albums"]["Insert"]>;
      };
      choreography: {
        Row: {
          id: string;
          owner_id: string;
          title: string;
          description: string | null;
          dance_form: string | null;
          composition: string | null;
          choreographer: string | null;
          guru: string | null;
          music: string | null;
          difficulty: string | null;
          duration_seconds: number | null;
          tags: string[];
          privacy: string;
          allow_download: boolean;
          storage_path: string | null;
          public_url: string | null;
          poster_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          title: string;
          description?: string | null;
          dance_form?: string | null;
          composition?: string | null;
          choreographer?: string | null;
          guru?: string | null;
          music?: string | null;
          difficulty?: string | null;
          duration_seconds?: number | null;
          tags?: string[];
          privacy?: string;
          allow_download?: boolean;
          storage_path?: string | null;
          public_url?: string | null;
          poster_url?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["choreography"]["Insert"]>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          body: string | null;
          href: string | null;
          read_at: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          body?: string | null;
          href?: string | null;
          read_at?: string | null;
          metadata?: Json;
        };
        Update: Partial<Database["public"]["Tables"]["notifications"]["Insert"]>;
      };
    };
  };
};

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type BoardRow = Database["public"]["Tables"]["boards"]["Row"];
export type SavedItemRow = Database["public"]["Tables"]["saved_items"]["Row"];
