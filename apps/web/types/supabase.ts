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
      api_keys: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          key: string
          last_used_at: string | null
          plan: Database["public"]["Enums"]["api_plan"] | null
          project_url: string | null
          requests_count: number | null
          requests_limit: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key: string
          last_used_at?: string | null
          plan?: Database["public"]["Enums"]["api_plan"] | null
          project_url?: string | null
          requests_count?: number | null
          requests_limit?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key?: string
          last_used_at?: string | null
          plan?: Database["public"]["Enums"]["api_plan"] | null
          project_url?: string | null
          requests_count?: number | null
          requests_limit?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      component_analytics: {
        Row: {
          activity_type: string | null
          component_id: number
          created_at: string
          id: number
          user_id: string | null
        }
        Insert: {
          activity_type?: string | null
          component_id: number
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Update: {
          activity_type?: string | null
          component_id?: number
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "component_analytics_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "component_dependencies_graph_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_analytics_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "components"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_analytics_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "components_with_username"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_analytics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      component_dependencies_closure: {
        Row: {
          component_id: number
          dependency_component_id: number
          depth: number
          is_demo_dependency: boolean
        }
        Insert: {
          component_id: number
          dependency_component_id: number
          depth: number
          is_demo_dependency?: boolean
        }
        Update: {
          component_id?: number
          dependency_component_id?: number
          depth?: number
          is_demo_dependency?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "component_dependencies_closure_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "component_dependencies_graph_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_dependencies_closure_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "components"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_dependencies_closure_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "components_with_username"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_dependencies_closure_dependency_component_id_fkey"
            columns: ["dependency_component_id"]
            isOneToOne: false
            referencedRelation: "component_dependencies_graph_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_dependencies_closure_dependency_component_id_fkey"
            columns: ["dependency_component_id"]
            isOneToOne: false
            referencedRelation: "components"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_dependencies_closure_dependency_component_id_fkey"
            columns: ["dependency_component_id"]
            isOneToOne: false
            referencedRelation: "components_with_username"
            referencedColumns: ["id"]
          },
        ]
      }
      component_likes: {
        Row: {
          component_id: number
          liked_at: string | null
          user_id: string
        }
        Insert: {
          component_id: number
          liked_at?: string | null
          user_id: string
        }
        Update: {
          component_id?: number
          liked_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "component_likes_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "component_dependencies_graph_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_likes_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "components"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_likes_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "components_with_username"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      component_tags: {
        Row: {
          component_id: number
          tag_id: number
        }
        Insert: {
          component_id?: number
          tag_id: number
        }
        Update: {
          component_id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "component_tags_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "component_dependencies_graph_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_tags_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "components"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_tags_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "components_with_username"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      components: {
        Row: {
          code: string
          compiled_css: string | null
          component_names: Json
          component_slug: string
          created_at: string
          demo_code: string | null
          demo_dependencies: Json | null
          demo_direct_registry_dependencies: Json
          dependencies: Json | null
          description: string | null
          direct_registry_dependencies: Json
          downloads_count: number
          fts: unknown | null
          global_css_extension: string | null
          hunter_username: string | null
          id: number
          is_paid: boolean
          is_public: boolean
          license: string
          likes_count: number
          name: string
          payment_url: string | null
          preview_url: string
          price: number
          pro_preview_image_url: string | null
          registry: string
          registry_url: string | null
          tailwind_config_extension: string | null
          updated_at: string
          user_id: string
          video_url: string | null
          website_url: string | null
        }
        Insert: {
          code?: string
          compiled_css?: string | null
          component_names: Json
          component_slug: string
          created_at?: string
          demo_code?: string | null
          demo_dependencies?: Json | null
          demo_direct_registry_dependencies?: Json
          dependencies?: Json | null
          description?: string | null
          direct_registry_dependencies?: Json
          downloads_count?: number
          fts?: unknown | null
          global_css_extension?: string | null
          hunter_username?: string | null
          id?: number
          is_paid?: boolean
          is_public?: boolean
          license?: string
          likes_count?: number
          name: string
          payment_url?: string | null
          preview_url: string
          price?: number
          pro_preview_image_url?: string | null
          registry?: string
          registry_url?: string | null
          tailwind_config_extension?: string | null
          updated_at?: string
          user_id: string
          video_url?: string | null
          website_url?: string | null
        }
        Update: {
          code?: string
          compiled_css?: string | null
          component_names?: Json
          component_slug?: string
          created_at?: string
          demo_code?: string | null
          demo_dependencies?: Json | null
          demo_direct_registry_dependencies?: Json
          dependencies?: Json | null
          description?: string | null
          direct_registry_dependencies?: Json
          downloads_count?: number
          fts?: unknown | null
          global_css_extension?: string | null
          hunter_username?: string | null
          id?: number
          is_paid?: boolean
          is_public?: boolean
          license?: string
          likes_count?: number
          name?: string
          payment_url?: string | null
          preview_url?: string
          price?: number
          pro_preview_image_url?: string | null
          registry?: string
          registry_url?: string | null
          tailwind_config_extension?: string | null
          updated_at?: string
          user_id?: string
          video_url?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "components_hunter_username_fkey"
            columns: ["hunter_username"]
            isOneToOne: false
            referencedRelation: "component_dependencies_graph_view"
            referencedColumns: ["source_author_username"]
          },
          {
            foreignKeyName: "components_hunter_username_fkey"
            columns: ["hunter_username"]
            isOneToOne: false
            referencedRelation: "component_dependencies_graph_view"
            referencedColumns: ["dependency_author_username"]
          },
          {
            foreignKeyName: "components_hunter_username_fkey"
            columns: ["hunter_username"]
            isOneToOne: false
            referencedRelation: "components_with_username"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "components_hunter_username_fkey"
            columns: ["hunter_username"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "components_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      demo_tags: {
        Row: {
          created_at: string | null
          demo_id: number
          id: number
          tag_id: number
        }
        Insert: {
          created_at?: string | null
          demo_id: number
          id?: never
          tag_id: number
        }
        Update: {
          created_at?: string | null
          demo_id?: number
          id?: never
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "demo_tags_demo_id_fkey"
            columns: ["demo_id"]
            isOneToOne: false
            referencedRelation: "demos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "demo_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      demos: {
        Row: {
          compiled_css: string | null
          component_id: number | null
          created_at: string | null
          demo_code: string
          demo_dependencies: Json | null
          demo_direct_registry_dependencies: Json | null
          demo_slug: string
          embedding: string | null
          embedding_oai: string | null
          fts: unknown | null
          id: number
          name: string | null
          preview_url: string | null
          pro_preview_image_url: string | null
          updated_at: string | null
          user_id: string
          video_url: string | null
        }
        Insert: {
          compiled_css?: string | null
          component_id?: number | null
          created_at?: string | null
          demo_code: string
          demo_dependencies?: Json | null
          demo_direct_registry_dependencies?: Json | null
          demo_slug?: string
          embedding?: string | null
          embedding_oai?: string | null
          fts?: unknown | null
          id?: number
          name?: string | null
          preview_url?: string | null
          pro_preview_image_url?: string | null
          updated_at?: string | null
          user_id: string
          video_url?: string | null
        }
        Update: {
          compiled_css?: string | null
          component_id?: number | null
          created_at?: string | null
          demo_code?: string
          demo_dependencies?: Json | null
          demo_direct_registry_dependencies?: Json | null
          demo_slug?: string
          embedding?: string | null
          embedding_oai?: string | null
          fts?: unknown | null
          id?: number
          name?: string | null
          preview_url?: string | null
          pro_preview_image_url?: string | null
          updated_at?: string | null
          user_id?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "demos_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "component_dependencies_graph_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "demos_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "components"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "demos_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "components_with_username"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "demos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      submissions: {
        Row: {
          component_id: number
          created_at: string
          id: number
          moderators_feedback: string | null
          status: Database["public"]["Enums"]["submission_status"]
        }
        Insert: {
          component_id: number
          created_at?: string
          id?: number
          moderators_feedback?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
        }
        Update: {
          component_id?: number
          created_at?: string
          id?: number
          moderators_feedback?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
        }
        Relationships: [
          {
            foreignKeyName: "submissions_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: true
            referencedRelation: "component_dependencies_graph_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: true
            referencedRelation: "components"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: true
            referencedRelation: "components_with_username"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          id: number
          name: string
          slug: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
        }
        Relationships: []
      }
      templates: {
        Row: {
          created_at: string
          description: string | null
          downloads_count: number | null
          id: number
          is_public: boolean | null
          likes_count: number | null
          name: string
          payment_url: string | null
          preview_url: string
          price: number
          template_slug: string
          updated_at: string
          user_id: string
          video_url: string | null
          website_preview_url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          downloads_count?: number | null
          id?: number
          is_public?: boolean | null
          likes_count?: number | null
          name: string
          payment_url?: string | null
          preview_url: string
          price?: number
          template_slug: string
          updated_at?: string
          user_id: string
          video_url?: string | null
          website_preview_url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          downloads_count?: number | null
          id?: number
          is_public?: boolean | null
          likes_count?: number | null
          name?: string
          payment_url?: string | null
          preview_url?: string
          price?: number
          template_slug?: string
          updated_at?: string
          user_id?: string
          video_url?: string | null
          website_preview_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "templates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          bio: string | null
          created_at: string
          display_image_url: string | null
          display_name: string | null
          display_username: string | null
          email: string
          github_url: string | null
          id: string
          image_url: string | null
          is_admin: boolean
          manually_added: boolean
          name: string | null
          pro_banner_url: string | null
          pro_referral_url: string | null
          twitter_url: string | null
          updated_at: string | null
          username: string | null
          website_url: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          display_image_url?: string | null
          display_name?: string | null
          display_username?: string | null
          email?: string
          github_url?: string | null
          id: string
          image_url?: string | null
          is_admin?: boolean
          manually_added?: boolean
          name?: string | null
          pro_banner_url?: string | null
          pro_referral_url?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          username?: string | null
          website_url?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          display_image_url?: string | null
          display_name?: string | null
          display_username?: string | null
          email?: string
          github_url?: string | null
          id?: string
          image_url?: string | null
          is_admin?: boolean
          manually_added?: boolean
          name?: string | null
          pro_banner_url?: string | null
          pro_referral_url?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          username?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      component_dependencies_graph_view: {
        Row: {
          code: string | null
          component_id: number | null
          component_names: Json | null
          component_slug: string | null
          created_at: string | null
          demo_code: string | null
          demo_dependencies: Json | null
          demo_direct_registry_dependencies: Json | null
          dependencies: Json | null
          dependency_author_display_username: string | null
          dependency_author_username: string | null
          dependency_component_id: number | null
          depth: number | null
          description: string | null
          direct_registry_dependencies: Json | null
          downloads_count: number | null
          fts: unknown | null
          id: number | null
          is_demo_dependency: boolean | null
          is_public: boolean | null
          license: string | null
          likes_count: number | null
          name: string | null
          preview_url: string | null
          registry: string | null
          source_author_display_username: string | null
          source_author_username: string | null
          source_component_slug: string | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "component_dependencies_closure_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "component_dependencies_graph_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_dependencies_closure_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "components"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_dependencies_closure_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "components_with_username"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_dependencies_closure_dependency_component_id_fkey"
            columns: ["dependency_component_id"]
            isOneToOne: false
            referencedRelation: "component_dependencies_graph_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_dependencies_closure_dependency_component_id_fkey"
            columns: ["dependency_component_id"]
            isOneToOne: false
            referencedRelation: "components"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_dependencies_closure_dependency_component_id_fkey"
            columns: ["dependency_component_id"]
            isOneToOne: false
            referencedRelation: "components_with_username"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "components_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      component_stats: {
        Row: {
          count: number | null
          filter_type: string | null
        }
        Relationships: []
      }
      components_with_username: {
        Row: {
          code: string | null
          component_names: Json | null
          component_slug: string | null
          created_at: string | null
          demo_code: string | null
          demo_dependencies: Json | null
          demo_direct_registry_dependencies: Json | null
          dependencies: Json | null
          description: string | null
          direct_registry_dependencies: Json | null
          downloads_count: number | null
          fts: unknown | null
          id: number | null
          is_public: boolean | null
          license: string | null
          likes_count: number | null
          name: string | null
          preview_url: string | null
          registry: string | null
          updated_at: string | null
          user: Json | null
          user_id: string | null
          username: string | null
          video_url: string | null
        }
        Relationships: [
          {
            foreignKeyName: "components_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      mv_component_analytics: {
        Row: {
          activity_type: string | null
          component_id: number | null
          count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "component_analytics_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "component_dependencies_graph_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_analytics_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "components"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_analytics_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "components_with_username"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      check_api_key: {
        Args: {
          api_key: string
        }
        Returns: Json
      }
      create_api_key: {
        Args: {
          user_id: string
          plan?: Database["public"]["Enums"]["api_plan"]
          requests_limit?: number
        }
        Returns: {
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          key: string
          last_used_at: string | null
          plan: Database["public"]["Enums"]["api_plan"] | null
          project_url: string | null
          requests_count: number | null
          requests_limit: number | null
          user_id: string
        }
      }
      delete_component: {
        Args: {
          component_id: number
        }
        Returns: boolean
      }
      get_active_authors: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          username: string
          name: string
          image_url: string
          display_username: string
          display_name: string
          display_image_url: string
          bio: string
          total_downloads: number
          total_usages: number
          total_views: number
          total_engagement: number
        }[]
      }
      get_active_authors_with_top_components: {
        Args: {
          p_offset?: number
          p_limit?: number
        }
        Returns: {
          id: string
          username: string
          name: string
          image_url: string
          display_username: string
          display_name: string
          display_image_url: string
          bio: string
          total_downloads: number
          total_usages: number
          total_views: number
          total_engagement: number
          top_components: Json
          total_count: number
        }[]
      }
      get_component_by_slug: {
        Args: {
          user_username: string
          component_slug_param: string
        }
        Returns: {
          component_id: number
          component_name: Json
          description: string
          code: string
          demo_code: string
          created_at: string
          updated_at: string
          user_id: string
          install_url: string
          dependencies: Json
          is_public: boolean
          downloads_count: number
          likes_count: number
          component_slug: string
          demo_component_name: string
          name: string
          demo_dependencies: Json
          internal_dependencies: Json
          preview_url: string
          license: string
          user_data: Json
          tags: Json
        }[]
      }
      get_components_counts: {
        Args: {
          p_tag_slug?: string
        }
        Returns: {
          filter_type: string
          count: number
        }[]
      }
      get_demos: {
        Args: {
          p_quick_filter: string
          p_sort_by: string
          p_offset: number
          p_limit: number
          p_tag_slug?: string
          p_include_private?: boolean
        }
        Returns: {
          id: number
          name: string
          demo_code: string
          preview_url: string
          video_url: string
          compiled_css: string
          demo_dependencies: Json
          demo_direct_registry_dependencies: Json
          pro_preview_image_url: string
          created_at: string
          updated_at: string
          component_id: number
          component_data: Json
          user_data: Json
          component_user_data: Json
          tags: Json
          total_count: number
          view_count: number
          fts: unknown
          demo_slug: string
          debug_info: Json
        }[]
      }
      get_demos_counts: {
        Args: Record<PropertyKey, never>
        Returns: {
          filter_type: string
          count: number
        }[]
      }
      get_demos_new: {
        Args: {
          p_sort_by: string
          p_offset: number
          p_limit: number
          p_tag_slug?: string
          p_include_private?: boolean
        }
        Returns: {
          id: number
          name: string
          demo_code: string
          preview_url: string
          video_url: string
          compiled_css: string
          demo_dependencies: Json
          demo_direct_registry_dependencies: Json
          pro_preview_image_url: string
          created_at: string
          updated_at: string
          component_id: number
          component_data: Json
          user_data: Json
          component_user_data: Json
          tags: Json
          total_count: number
          view_count: number
          fts: unknown
          demo_slug: string
          debug_info: Json
        }[]
      }
      get_demos_optimized: {
        Args: {
          p_quick_filter: string
          p_sort_by: string
          p_offset: number
          p_limit: number
          p_tag_slug?: string
          p_include_private?: boolean
        }
        Returns: {
          id: number
          name: string
          demo_slug: string
          preview_url: string
          video_url: string
          updated_at: string
          component_data: Json
          user_data: Json
          component_user_data: Json
          view_count: number
        }[]
      }
      get_filtered_components: {
        Args: {
          p_quick_filter: string
          p_sort_by: string
          p_offset: number
          p_limit: number
          p_include_private?: boolean
        }
        Returns: {
          id: number
          component_names: Json
          description: string
          code: string
          demo_code: string
          created_at: string
          updated_at: string
          user_id: string
          dependencies: Json
          is_public: boolean
          downloads_count: number
          likes_count: number
          component_slug: string
          name: string
          demo_dependencies: Json
          registry: string
          direct_registry_dependencies: Json
          demo_direct_registry_dependencies: Json
          preview_url: string
          video_url: string
          license: string
          user_data: Json
          total_count: number
        }[]
      }
      get_filtered_demos: {
        Args: {
          p_quick_filter: string
          p_sort_by: string
          p_offset: number
          p_limit: number
          p_tag_slug?: string
          p_include_private?: boolean
        }
        Returns: {
          id: number
          name: string
          demo_code: string
          preview_url: string
          video_url: string
          compiled_css: string
          demo_dependencies: Json
          demo_direct_registry_dependencies: Json
          pro_preview_image_url: string
          created_at: string
          updated_at: string
          component_id: number
          component_data: Json
          user_data: Json
          component_user_data: Json
          tags: Json
          total_count: number
          fts: unknown
          demo_slug: string
          debug_info: Json
        }[]
      }
      get_filtered_demos_with_views: {
        Args: {
          p_quick_filter: string
          p_sort_by: string
          p_offset: number
          p_limit: number
          p_tag_slug?: string
          p_include_private?: boolean
        }
        Returns: {
          id: number
          name: string
          demo_code: string
          preview_url: string
          video_url: string
          compiled_css: string
          demo_dependencies: Json
          demo_direct_registry_dependencies: Json
          pro_preview_image_url: string
          created_at: string
          updated_at: string
          component_id: number
          component_data: Json
          user_data: Json
          component_user_data: Json
          tags: Json
          total_count: number
          view_count: number
          fts: unknown
          demo_slug: string
          debug_info: Json
        }[]
      }
      get_filtered_demos_with_views_and_usage: {
        Args: {
          p_quick_filter: string
          p_sort_by: string
          p_offset: number
          p_limit: number
          p_tag_slug?: string
          p_include_private?: boolean
        }
        Returns: {
          id: number
          name: string
          demo_code: string
          preview_url: string
          video_url: string
          compiled_css: string
          demo_dependencies: Json
          demo_direct_registry_dependencies: Json
          pro_preview_image_url: string
          created_at: string
          updated_at: string
          component_id: number
          component_data: Json
          user_data: Json
          component_user_data: Json
          tags: Json
          total_count: number
          view_count: number
          fts: unknown
          demo_slug: string
          debug_info: Json
        }[]
      }
      get_hunted_components: {
        Args: {
          p_hunter_username: string
        }
        Returns: {
          id: number
          name: string
          description: string
          component_slug: string
          demo_code: string
          preview_url: string
          video_url: string
          compiled_css: string
          demo_dependencies: Json
          demo_direct_registry_dependencies: Json
          demo_slug: string
          component_id: number
          user_id: string
          pro_preview_image_url: string
          created_at: string
          updated_at: string
          fts: unknown
          component: Json
          user_data: Json
          tags: Json
          view_count: number
        }[]
      }
      get_random_components: {
        Args: Record<PropertyKey, never>
        Returns: {
          code: string
          compiled_css: string | null
          component_names: Json
          component_slug: string
          created_at: string
          demo_code: string | null
          demo_dependencies: Json | null
          demo_direct_registry_dependencies: Json
          dependencies: Json | null
          description: string | null
          direct_registry_dependencies: Json
          downloads_count: number
          fts: unknown | null
          global_css_extension: string | null
          hunter_username: string | null
          id: number
          is_paid: boolean
          is_public: boolean
          license: string
          likes_count: number
          name: string
          payment_url: string | null
          preview_url: string
          price: number
          pro_preview_image_url: string | null
          registry: string
          registry_url: string | null
          tailwind_config_extension: string | null
          updated_at: string
          user_id: string
          video_url: string | null
          website_url: string | null
        }[]
      }
      get_section_previews: {
        Args: {
          p_demo_ids: number[]
        }
        Returns: {
          demo_id: number
          preview_url: string
          video_url: string
        }[]
      }
      get_sections: {
        Args: {
          p_tag_slugs?: string[]
        }
        Returns: {
          tag_id: number
          tag_name: string
          tag_slug: string
          component_id: number
          component_name: string
          component_slug: string
          preview_url: string
          video_url: string
          user_data: Json
          downloads_count: number
          view_count: number
        }[]
      }
      get_templates: {
        Args: {
          p_offset?: number
          p_limit?: number
          p_include_private?: boolean
        }
        Returns: {
          id: number
          name: string
          description: string
          preview_url: string
          video_url: string
          website_preview_url: string
          price: number
          payment_url: string
          created_at: string
          updated_at: string
          user_data: Json
          downloads_count: number
          likes_count: number
        }[]
      }
      get_user_components_counts: {
        Args: {
          p_user_id: string
        }
        Returns: Json
      }
      get_user_demos: {
        Args: {
          p_user_id: string
        }
        Returns: {
          id: number
          component_id: number
          name: string
          demo_code: string
          created_at: string
          updated_at: string
          user_id: string
          demo_dependencies: Json
          demo_direct_registry_dependencies: Json
          preview_url: string
          video_url: string
          compiled_css: string
          pro_preview_image_url: string
          component_data: Json
          user_data: Json
          is_paid: boolean
          payment_url: string
          price: number
          license: string
          website_url: string
          downloads_count: number
          likes_count: number
          fts: unknown
          demo_slug: string
        }[]
      }
      get_user_liked_components: {
        Args: {
          p_user_id: string
          p_include_private?: boolean
        }
        Returns: {
          id: number
          name: string
          demo_code: string
          preview_url: string
          video_url: string
          compiled_css: string
          demo_dependencies: Json
          demo_direct_registry_dependencies: Json
          pro_preview_image_url: string
          created_at: string
          updated_at: string
          component_id: number
          component_data: Json
          user_data: Json
          component_user_data: Json
          tags: Json
          total_count: number
          view_count: number
          fts: unknown
          demo_slug: string
          debug_info: Json
        }[]
      }
      get_user_liked_components_optimized: {
        Args: {
          p_user_id: string
          p_include_private?: boolean
        }
        Returns: {
          id: number
          name: string
          preview_url: string
          video_url: string
          updated_at: string
          component_data: Json
          user_data: Json
          component_user_data: Json
          view_count: number
          demo_slug: string
        }[]
      }
      get_user_profile_demos: {
        Args: {
          p_user_id: string
          p_include_private?: boolean
        }
        Returns: {
          id: number
          name: string
          preview_url: string
          video_url: string
          updated_at: string
          demo_slug: string
          component_data: Json
          user_data: Json
          component_user_data: Json
        }[]
      }
      increment: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      increment_api_requests: {
        Args: {
          key_id: string
        }
        Returns: undefined
      }
      is_trigger_operation: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search_components: {
        Args: {
          search_query: string
        }
        Returns: Database["public"]["CompositeTypes"]["component_with_user"][]
      }
      search_components_preview: {
        Args: {
          p_search_query: string
        }
        Returns: {
          id: number
          name: string
          description: string
          preview_url: string
          user_data: Json
          downloads_count: number
          likes_count: number
          component_slug: string
        }[]
      }
      search_demos: {
        Args: {
          search_query: string
        }
        Returns: {
          id: number
          component_id: number
          name: string
          demo_code: string
          created_at: string
          updated_at: string
          user_id: string
          demo_dependencies: Json
          demo_direct_registry_dependencies: Json
          preview_url: string
          video_url: string
          compiled_css: string
          pro_preview_image_url: string
          component_data: Json
          user_data: Json
          is_paid: boolean
          payment_url: string
          price: number
          license: string
          website_url: string
          downloads_count: number
          likes_count: number
          fts: unknown
          demo_slug: string
        }[]
      }
      search_demos_ai: {
        Args: {
          match_threshold?: number
          query_embedding?: string
          search_query?: string
        }
        Returns: {
          id: number
          name: string
          preview_url: string
          video_url: string
          component_data: Json
          user_data: Json
          usage_data: Json
        }[]
      }
      search_demos_ai_oai: {
        Args: {
          match_threshold?: number
          query_embedding?: string
          search_query?: string
        }
        Returns: {
          id: number
          name: string
          preview_url: string
          video_url: string
          demo_slug: string
          user_id: string
          component_data: Json
          user_data: Json
          usage_data: Json
        }[]
      }
      update_component_dependencies_closure: {
        Args: {
          p_component_id: number
          p_demo_slug?: string
        }
        Returns: undefined
      }
      update_component_with_tags:
        | {
            Args: {
              p_component_id: number
              p_name?: string
              p_description?: string
              p_license?: string
              p_preview_url?: string
              p_tags?: Json
            }
            Returns: undefined
          }
        | {
            Args: {
              p_component_id: number
              p_name?: string
              p_description?: string
              p_license?: string
              p_preview_url?: string
              p_website_url?: string
              p_tags?: Json
            }
            Returns: undefined
          }
      update_demo_tags: {
        Args: {
          p_demo_id: number
          p_tags: Json
        }
        Returns: undefined
      }
    }
    Enums: {
      api_plan: "free" | "pro" | "enterprise"
      submission_status: "on_review" | "featured" | "posted"
    }
    CompositeTypes: {
      component_with_user: {
        id: number | null
        component_names: Json | null
        description: string | null
        code: string | null
        demo_code: string | null
        created_at: string | null
        updated_at: string | null
        user_id: string | null
        dependencies: Json | null
        is_public: boolean | null
        downloads_count: number | null
        likes_count: number | null
        component_slug: string | null
        name: string | null
        demo_dependencies: Json | null
        registry: string | null
        direct_registry_dependencies: Json | null
        demo_direct_registry_dependencies: Json | null
        preview_url: string | null
        license: string | null
        video_url: string | null
        user_data: Json | null
        compiled_css: string | null
        global_css_extension: string | null
        tailwind_config_extension: string | null
        website_url: string | null
        is_paid: boolean | null
        payment_url: string | null
        price: number | null
        pro_preview_image_url: string | null
      }
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
