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
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
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
          }
        ]
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
          }
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          is_admin: boolean | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          is_admin?: boolean | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          is_admin?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      service_type: "sonarr" | "radarr" | "prowlarr" | "qbittorrent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}