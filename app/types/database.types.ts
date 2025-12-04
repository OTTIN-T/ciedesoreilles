export type Json
  = | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
  public: {
    Tables: {
      agenda: {
        Row: {
          created_at: string
          date: string
          id: number
          link: string | null
          location: string
          show_id: number | null
        }
        Insert: {
          created_at?: string
          date: string
          id?: number
          link?: string | null
          location: string
          show_id?: number | null
        }
        Update: {
          created_at?: string
          date?: string
          id?: number
          link?: string | null
          location?: string
          show_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'agenda_show_id_fkey'
            columns: ['show_id']
            referencedRelation: 'shows'
            referencedColumns: ['id']
          },
        ]
      }
      news: {
        Row: {
          content: string | null
          created_at: string
          id: number
          image_url: string | null
          published: boolean | null
          title: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          image_url?: string | null
          published?: boolean | null
          title: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          image_url?: string | null
          published?: boolean | null
          title?: string
        }
        Relationships: []
      }
      shows: {
        Row: {
          audience: string | null
          created_at: string
          description: string | null
          duration: string | null
          id: number
          image_url: string | null
          slug: string
          title: string
          featured: boolean
        }
        Insert: {
          audience?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: number
          image_url?: string | null
          slug: string
          title: string
          featured?: boolean
        }
        Update: {
          audience?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: number
          image_url?: string | null
          slug?: string
          title?: string
          featured?: boolean
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
