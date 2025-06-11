
export interface Project {
  id: string;
  title: string;
  description: string;
  full_description?: string;
  image_url?: string;
  images?: string[];
  tags: string[];
  live_url?: string;
  github_url?: string;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectData {
  title: string;
  description: string;
  full_description?: string;
  image_url?: string;
  images?: string[];
  tags: string[];
  live_url?: string;
  github_url?: string;
  published: boolean;
}

export interface AdminUser {
  id: string;
  username: string;
  created_at: string;
}
