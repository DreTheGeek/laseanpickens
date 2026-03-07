export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      lp_admin_activity: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          entity_id: string | null
          entity_type: string | null
          id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
        }
        Relationships: []
      }
      lp_affiliate_clicks: {
        Row: {
          affiliate_id: string | null
          converted: boolean | null
          created_at: string | null
          id: string
          ip_address: string | null
          page: string | null
        }
        Insert: {
          affiliate_id?: string | null
          converted?: boolean | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          page?: string | null
        }
        Update: {
          affiliate_id?: string | null
          converted?: boolean | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          page?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lp_affiliate_clicks_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "lp_affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      lp_affiliate_payouts: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          paid_at: string | null
          referral_count: number | null
          referrer_id: string | null
          status: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          paid_at?: string | null
          referral_count?: number | null
          referrer_id?: string | null
          status?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          paid_at?: string | null
          referral_count?: number | null
          referrer_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lp_affiliate_payouts_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "lp_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      lp_affiliate_referrals: {
        Row: {
          affiliate_code: string
          commission_amount: number | null
          commission_rate: number | null
          converted_at: string | null
          created_at: string | null
          id: string
          paid_at: string | null
          referred_client_id: string | null
          referred_email: string
          referrer_id: string | null
          status: string | null
        }
        Insert: {
          affiliate_code: string
          commission_amount?: number | null
          commission_rate?: number | null
          converted_at?: string | null
          created_at?: string | null
          id?: string
          paid_at?: string | null
          referred_client_id?: string | null
          referred_email: string
          referrer_id?: string | null
          status?: string | null
        }
        Update: {
          affiliate_code?: string
          commission_amount?: number | null
          commission_rate?: number | null
          converted_at?: string | null
          created_at?: string | null
          id?: string
          paid_at?: string | null
          referred_client_id?: string | null
          referred_email?: string
          referrer_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lp_affiliate_referrals_referred_client_id_fkey"
            columns: ["referred_client_id"]
            isOneToOne: false
            referencedRelation: "lp_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lp_affiliate_referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "lp_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      lp_affiliates: {
        Row: {
          code: string
          commission_rate: number | null
          created_at: string | null
          email: string
          id: string
          name: string
          status: string | null
          total_earned: number | null
        }
        Insert: {
          code: string
          commission_rate?: number | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          status?: string | null
          total_earned?: number | null
        }
        Update: {
          code?: string
          commission_rate?: number | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          status?: string | null
          total_earned?: number | null
        }
        Relationships: []
      }
      lp_analytics: {
        Row: {
          assessment_completions: number | null
          created_at: string | null
          date: string
          id: string
          new_leads: number | null
          new_orders: number | null
          new_subscribers: number | null
          page_views: number | null
          quiz_completions: number | null
          revenue: number | null
        }
        Insert: {
          assessment_completions?: number | null
          created_at?: string | null
          date: string
          id?: string
          new_leads?: number | null
          new_orders?: number | null
          new_subscribers?: number | null
          page_views?: number | null
          quiz_completions?: number | null
          revenue?: number | null
        }
        Update: {
          assessment_completions?: number | null
          created_at?: string | null
          date?: string
          id?: string
          new_leads?: number | null
          new_orders?: number | null
          new_subscribers?: number | null
          page_views?: number | null
          quiz_completions?: number | null
          revenue?: number | null
        }
        Relationships: []
      }
      lp_campaigns: {
        Row: {
          body: string | null
          click_count: number | null
          created_at: string | null
          id: string
          name: string
          open_count: number | null
          scheduled_at: string | null
          sent_at: string | null
          sent_count: number | null
          status: string
          subject: string | null
          type: string | null
        }
        Insert: {
          body?: string | null
          click_count?: number | null
          created_at?: string | null
          id?: string
          name: string
          open_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          sent_count?: number | null
          status?: string
          subject?: string | null
          type?: string | null
        }
        Update: {
          body?: string | null
          click_count?: number | null
          created_at?: string | null
          id?: string
          name?: string
          open_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          sent_count?: number | null
          status?: string
          subject?: string | null
          type?: string | null
        }
        Relationships: []
      }
      lp_chargebacks: {
        Row: {
          amount: number | null
          created_at: string | null
          email: string | null
          id: string
          order_id: string | null
          reason: string | null
          status: string | null
          stripe_dispute_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          email?: string | null
          id?: string
          order_id?: string | null
          reason?: string | null
          status?: string | null
          stripe_dispute_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          email?: string | null
          id?: string
          order_id?: string | null
          reason?: string | null
          status?: string | null
          stripe_dispute_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lp_chargebacks_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "lp_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      lp_client_points: {
        Row: {
          client_id: string | null
          created_at: string | null
          id: string
          points: number
          reason: string
          source: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          id?: string
          points: number
          reason: string
          source?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          id?: string
          points?: number
          reason?: string
          source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lp_client_points_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "lp_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      lp_clients: {
        Row: {
          company: string | null
          email: string
          id: string
          joined_at: string | null
          last_active: string | null
          name: string
          onboarding_step: number | null
          password_hash: string | null
          phone: string | null
          status: string
          tier: string | null
          total_spent: number | null
        }
        Insert: {
          company?: string | null
          email: string
          id?: string
          joined_at?: string | null
          last_active?: string | null
          name: string
          onboarding_step?: number | null
          password_hash?: string | null
          phone?: string | null
          status?: string
          tier?: string | null
          total_spent?: number | null
        }
        Update: {
          company?: string | null
          email?: string
          id?: string
          joined_at?: string | null
          last_active?: string | null
          name?: string
          onboarding_step?: number | null
          password_hash?: string | null
          phone?: string | null
          status?: string
          tier?: string | null
          total_spent?: number | null
        }
        Relationships: []
      }
      lp_communications: {
        Row: {
          body: string | null
          client_id: string | null
          created_at: string | null
          direction: string | null
          id: string
          subject: string | null
          type: string
        }
        Insert: {
          body?: string | null
          client_id?: string | null
          created_at?: string | null
          direction?: string | null
          id?: string
          subject?: string | null
          type: string
        }
        Update: {
          body?: string | null
          client_id?: string | null
          created_at?: string | null
          direction?: string | null
          id?: string
          subject?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "lp_communications_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "lp_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      lp_community_messages: {
        Row: {
          author_name: string
          client_id: string | null
          created_at: string | null
          id: string
          is_host: boolean | null
          message: string
        }
        Insert: {
          author_name: string
          client_id?: string | null
          created_at?: string | null
          id?: string
          is_host?: boolean | null
          message: string
        }
        Update: {
          author_name?: string
          client_id?: string | null
          created_at?: string | null
          id?: string
          is_host?: boolean | null
          message?: string
        }
        Relationships: [
          {
            foreignKeyName: "lp_community_messages_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "lp_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      lp_contracts: {
        Row: {
          client_id: string | null
          created_at: string | null
          document_url: string | null
          id: string
          proposal_id: string | null
          signed_at: string | null
          status: string | null
          title: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          document_url?: string | null
          id?: string
          proposal_id?: string | null
          signed_at?: string | null
          status?: string | null
          title?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          document_url?: string | null
          id?: string
          proposal_id?: string | null
          signed_at?: string | null
          status?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lp_contracts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "lp_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lp_contracts_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "lp_proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      lp_course_progress: {
        Row: {
          client_id: string | null
          completed_at: string | null
          course_slug: string
          course_title: string
          created_at: string | null
          id: string
          last_accessed_at: string | null
          progress_pct: number | null
        }
        Insert: {
          client_id?: string | null
          completed_at?: string | null
          course_slug: string
          course_title: string
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          progress_pct?: number | null
        }
        Update: {
          client_id?: string | null
          completed_at?: string | null
          course_slug?: string
          course_title?: string
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          progress_pct?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lp_course_progress_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "lp_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      lp_documents: {
        Row: {
          client_id: string | null
          created_at: string | null
          file_url: string | null
          id: string
          name: string
          size: string | null
          type: string | null
          uploaded_by: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          file_url?: string | null
          id?: string
          name: string
          size?: string | null
          type?: string | null
          uploaded_by?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          file_url?: string | null
          id?: string
          name?: string
          size?: string | null
          type?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lp_documents_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "lp_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      lp_feedback: {
        Row: {
          client_id: string | null
          comment: string | null
          created_at: string | null
          id: string
          score: number | null
          type: string | null
        }
        Insert: {
          client_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          score?: number | null
          type?: string | null
        }
        Update: {
          client_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          score?: number | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lp_feedback_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "lp_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      lp_invoices: {
        Row: {
          amount: number
          client_id: string | null
          created_at: string | null
          due_date: string | null
          id: string
          invoice_number: string
          order_id: string | null
          paid_at: string | null
          status: string | null
          tax: number | null
          total: number
        }
        Insert: {
          amount: number
          client_id?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          invoice_number: string
          order_id?: string | null
          paid_at?: string | null
          status?: string | null
          tax?: number | null
          total: number
        }
        Update: {
          amount?: number
          client_id?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          invoice_number?: string
          order_id?: string | null
          paid_at?: string | null
          status?: string | null
          tax?: number | null
          total?: number
        }
        Relationships: [
          {
            foreignKeyName: "lp_invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "lp_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lp_invoices_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "lp_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      lp_leads: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          grade: string | null
          id: string
          message: string | null
          name: string | null
          phone: string | null
          score: number | null
          source: string
          status: string
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          grade?: string | null
          id?: string
          message?: string | null
          name?: string | null
          phone?: string | null
          score?: number | null
          source?: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          grade?: string | null
          id?: string
          message?: string | null
          name?: string | null
          phone?: string | null
          score?: number | null
          source?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      lp_live_stream_chats: {
        Row: {
          author_name: string
          client_id: string | null
          created_at: string | null
          id: string
          is_host: boolean | null
          message: string
          stream_id: string | null
        }
        Insert: {
          author_name: string
          client_id?: string | null
          created_at?: string | null
          id?: string
          is_host?: boolean | null
          message: string
          stream_id?: string | null
        }
        Update: {
          author_name?: string
          client_id?: string | null
          created_at?: string | null
          id?: string
          is_host?: boolean | null
          message?: string
          stream_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lp_live_stream_chats_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "lp_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lp_live_stream_chats_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "lp_live_streams"
            referencedColumns: ["id"]
          },
        ]
      }
      lp_live_streams: {
        Row: {
          created_at: string | null
          duration_minutes: number | null
          ended_at: string | null
          id: string
          peak_viewers: number | null
          started_at: string | null
          status: string | null
          stream_key: string | null
          title: string
          viewer_count: number | null
        }
        Insert: {
          created_at?: string | null
          duration_minutes?: number | null
          ended_at?: string | null
          id?: string
          peak_viewers?: number | null
          started_at?: string | null
          status?: string | null
          stream_key?: string | null
          title: string
          viewer_count?: number | null
        }
        Update: {
          created_at?: string | null
          duration_minutes?: number | null
          ended_at?: string | null
          id?: string
          peak_viewers?: number | null
          started_at?: string | null
          status?: string | null
          stream_key?: string | null
          title?: string
          viewer_count?: number | null
        }
        Relationships: []
      }
      lp_milestones: {
        Row: {
          achieved_at: string | null
          client_id: string | null
          description: string | null
          id: string
          milestone: string
        }
        Insert: {
          achieved_at?: string | null
          client_id?: string | null
          description?: string | null
          id?: string
          milestone: string
        }
        Update: {
          achieved_at?: string | null
          client_id?: string | null
          description?: string | null
          id?: string
          milestone?: string
        }
        Relationships: [
          {
            foreignKeyName: "lp_milestones_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "lp_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      lp_notifications: {
        Row: {
          action_url: string | null
          client_id: string | null
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string | null
        }
        Insert: {
          action_url?: string | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type?: string | null
        }
        Update: {
          action_url?: string | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lp_notifications_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "lp_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      lp_onboarding_steps: {
        Row: {
          client_id: string | null
          completed_at: string | null
          created_at: string | null
          id: string
          order_id: string | null
          status: string | null
          step_name: string
          step_number: number
        }
        Insert: {
          client_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          status?: string | null
          step_name: string
          step_number: number
        }
        Update: {
          client_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          status?: string | null
          step_name?: string
          step_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "lp_onboarding_steps_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "lp_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lp_onboarding_steps_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "lp_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      lp_orders: {
        Row: {
          amount: number | null
          created_at: string | null
          currency: string | null
          email: string
          id: string
          name: string | null
          service: string | null
          service_slug: string | null
          status: string
          stripe_customer: string | null
          stripe_session_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          currency?: string | null
          email: string
          id?: string
          name?: string | null
          service?: string | null
          service_slug?: string | null
          status?: string
          stripe_customer?: string | null
          stripe_session_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          currency?: string | null
          email?: string
          id?: string
          name?: string | null
          service?: string | null
          service_slug?: string | null
          status?: string
          stripe_customer?: string | null
          stripe_session_id?: string | null
        }
        Relationships: []
      }
      lp_page_views: {
        Row: {
          created_at: string | null
          id: string
          ip_hash: string | null
          page_path: string
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          ip_hash?: string | null
          page_path: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          ip_hash?: string | null
          page_path?: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      lp_password_resets: {
        Row: {
          created_at: string | null
          email: string
          expires_at: string
          id: string
          token: string
          used: boolean | null
        }
        Insert: {
          created_at?: string | null
          email: string
          expires_at: string
          id?: string
          token: string
          used?: boolean | null
        }
        Update: {
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          token?: string
          used?: boolean | null
        }
        Relationships: []
      }
      lp_pipeline: {
        Row: {
          client_id: string | null
          company: string | null
          created_at: string | null
          email: string | null
          id: string
          lead_id: string | null
          name: string
          notes: string | null
          probability: number | null
          service: string | null
          stage: string
          updated_at: string | null
          value: number | null
        }
        Insert: {
          client_id?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          lead_id?: string | null
          name: string
          notes?: string | null
          probability?: number | null
          service?: string | null
          stage?: string
          updated_at?: string | null
          value?: number | null
        }
        Update: {
          client_id?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          lead_id?: string | null
          name?: string
          notes?: string | null
          probability?: number | null
          service?: string | null
          stage?: string
          updated_at?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lp_pipeline_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "lp_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lp_pipeline_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "lp_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lp_proposals: {
        Row: {
          accepted_at: string | null
          client_email: string | null
          client_name: string | null
          created_at: string | null
          id: string
          lead_id: string | null
          sent_at: string | null
          services: Json | null
          status: string | null
          total_value: number | null
          viewed_at: string | null
        }
        Insert: {
          accepted_at?: string | null
          client_email?: string | null
          client_name?: string | null
          created_at?: string | null
          id?: string
          lead_id?: string | null
          sent_at?: string | null
          services?: Json | null
          status?: string | null
          total_value?: number | null
          viewed_at?: string | null
        }
        Update: {
          accepted_at?: string | null
          client_email?: string | null
          client_name?: string | null
          created_at?: string | null
          id?: string
          lead_id?: string | null
          sent_at?: string | null
          services?: Json | null
          status?: string | null
          total_value?: number | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lp_proposals_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "lp_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lp_referrals: {
        Row: {
          created_at: string | null
          id: string
          referred_email: string
          referred_name: string | null
          referrer_client_id: string | null
          reward_paid: boolean | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          referred_email: string
          referred_name?: string | null
          referrer_client_id?: string | null
          reward_paid?: boolean | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          referred_email?: string
          referred_name?: string | null
          referrer_client_id?: string | null
          reward_paid?: boolean | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lp_referrals_referrer_client_id_fkey"
            columns: ["referrer_client_id"]
            isOneToOne: false
            referencedRelation: "lp_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      lp_refunds: {
        Row: {
          admin_notes: string | null
          amount: number
          client_id: string | null
          created_at: string | null
          id: string
          order_id: string | null
          processed_at: string | null
          reason: string
          status: string | null
        }
        Insert: {
          admin_notes?: string | null
          amount: number
          client_id?: string | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          processed_at?: string | null
          reason: string
          status?: string | null
        }
        Update: {
          admin_notes?: string | null
          amount?: number
          client_id?: string | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          processed_at?: string | null
          reason?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lp_refunds_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "lp_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lp_refunds_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "lp_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      lp_seo_snapshots: {
        Row: {
          clicks: number | null
          created_at: string | null
          date: string
          id: string
          impressions: number | null
          keyword: string | null
          performance_score: number | null
          position: number | null
          url: string | null
        }
        Insert: {
          clicks?: number | null
          created_at?: string | null
          date: string
          id?: string
          impressions?: number | null
          keyword?: string | null
          performance_score?: number | null
          position?: number | null
          url?: string | null
        }
        Update: {
          clicks?: number | null
          created_at?: string | null
          date?: string
          id?: string
          impressions?: number | null
          keyword?: string | null
          performance_score?: number | null
          position?: number | null
          url?: string | null
        }
        Relationships: []
      }
      lp_subscribers: {
        Row: {
          email: string
          id: string
          source: string | null
          status: string
          subscribed_at: string | null
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          source?: string | null
          status?: string
          subscribed_at?: string | null
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          source?: string | null
          status?: string
          subscribed_at?: string | null
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      lp_support_ticket_messages: {
        Row: {
          author_name: string
          author_type: string | null
          created_at: string | null
          id: string
          message: string
          ticket_id: string | null
        }
        Insert: {
          author_name: string
          author_type?: string | null
          created_at?: string | null
          id?: string
          message: string
          ticket_id?: string | null
        }
        Update: {
          author_name?: string
          author_type?: string | null
          created_at?: string | null
          id?: string
          message?: string
          ticket_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lp_support_ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "lp_support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      lp_support_tickets: {
        Row: {
          assigned_to: string | null
          client_id: string | null
          created_at: string | null
          description: string
          id: string
          priority: string | null
          resolved_at: string | null
          status: string | null
          subject: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          client_id?: string | null
          created_at?: string | null
          description: string
          id?: string
          priority?: string | null
          resolved_at?: string | null
          status?: string | null
          subject: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          client_id?: string | null
          created_at?: string | null
          description?: string
          id?: string
          priority?: string | null
          resolved_at?: string | null
          status?: string | null
          subject?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lp_support_tickets_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "lp_clients"
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
