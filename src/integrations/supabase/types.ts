export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          icon_url: string | null
          id: number
          name: string
        }
        Insert: {
          icon_url?: string | null
          id?: number
          name: string
        }
        Update: {
          icon_url?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      credentials: {
        Row: {
          api_key: string | null
          created_at: string | null
          id: number
          name: string
          password: string | null
          service: Database["public"]["Enums"]["service_type"]
          updated_at: string | null
          url: string
          user_id: string | null
          username: string | null
        }
        Insert: {
          api_key?: string | null
          created_at?: string | null
          id?: number
          name: string
          password?: string | null
          service: Database["public"]["Enums"]["service_type"]
          updated_at?: string | null
          url: string
          user_id?: string | null
          username?: string | null
        }
        Update: {
          api_key?: string | null
          created_at?: string | null
          id?: number
          name?: string
          password?: string | null
          service?: Database["public"]["Enums"]["service_type"]
          updated_at?: string | null
          url?: string
          user_id?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "credentials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      icon_metadata: {
        Row: {
          category: Database["public"]["Enums"]["icon_category"]
          created_at: string
          description: string | null
          file_path: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["icon_category"]
          created_at?: string
          description?: string | null
          file_path: string
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["icon_category"]
          created_at?: string
          description?: string | null
          file_path?: string
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      links: {
        Row: {
          category_id: number | null
          description: string | null
          icon_backup_url: string | null
          icon_url: string | null
          id: number
          last_scraped_at: string | null
          scraping_error: string | null
          title: string | null
          url: string | null
        }
        Insert: {
          category_id?: number | null
          description?: string | null
          icon_backup_url?: string | null
          icon_url?: string | null
          id: number
          last_scraped_at?: string | null
          scraping_error?: string | null
          title?: string | null
          url?: string | null
        }
        Update: {
          category_id?: number | null
          description?: string | null
          icon_backup_url?: string | null
          icon_url?: string | null
          id?: number
          last_scraped_at?: string | null
          scraping_error?: string | null
          title?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Refrences_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          is_admin: boolean | null
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          is_admin?: boolean | null
          role?: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          is_admin?: boolean | null
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      user_themes: {
        Row: {
          accent_color: string | null
          created_at: string | null
          font_family: string | null
          font_size: string | null
          id: number
          primary_color: string | null
          secondary_color: string | null
          theme_preset: Database["public"]["Enums"]["theme_preset"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          accent_color?: string | null
          created_at?: string | null
          font_family?: string | null
          font_size?: string | null
          id?: number
          primary_color?: string | null
          secondary_color?: string | null
          theme_preset?: Database["public"]["Enums"]["theme_preset"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          accent_color?: string | null
          created_at?: string | null
          font_family?: string | null
          font_size?: string | null
          id?: number
          primary_color?: string | null
          secondary_color?: string | null
          theme_preset?: Database["public"]["Enums"]["theme_preset"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_themes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      icon_category:
        | "navigation"
        | "action"
        | "status"
        | "media"
        | "social"
        | "misc"
      service_type:
        | "sonarr"
        | "radarr"
        | "prowlarr"
        | "qbittorrent"
        | "lidarr"
        | "readarr"
        | "transmission"
        | "deluge"
        | "rtorrent"
        | "bazarr"
        | "nzbget"
        | "sabnzbd"
        | "jackett"
        | "plex"
        | "jellyfin"
        | "emby"
        | "tautulli"
        | "overseerr"
        | "ombi"
      theme_preset: "default" | "dark" | "light" | "forest" | "ocean" | "sunset"
      user_role: "viewer" | "moderator" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
