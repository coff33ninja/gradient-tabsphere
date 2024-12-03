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
      profiles: {
        Row: {
          id: string
          email: string | null
          created_at: string | null
          is_admin: boolean | null
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          id: string
          email?: string | null
          created_at?: string | null
          is_admin?: boolean | null
          role?: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          id?: string
          email?: string | null
          created_at?: string | null
          is_admin?: boolean | null
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
    }
    Enums: {
      service_type: "sonarr" | "radarr" | "prowlarr" | "qbittorrent"
      user_role: "viewer" | "moderator" | "admin"
    }
  }
}