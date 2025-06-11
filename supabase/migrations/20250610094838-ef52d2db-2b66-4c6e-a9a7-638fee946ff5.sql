-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  full_description TEXT,
  image_url TEXT,
  images TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  live_url TEXT,
  github_url TEXT,
  published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_users table for authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default admin user (password: admin123)
INSERT INTO public.admin_users (username, password_hash) 
VALUES ('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for projects (public read, admin write)
CREATE POLICY "Anyone can view published projects" 
  ON public.projects 
  FOR SELECT 
  USING (published = true);

CREATE POLICY "Authenticated users can view all projects" 
  ON public.projects 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Service role can manage projects" 
  ON public.projects 
  FOR ALL 
  USING (auth.role() = 'service_role');

-- Create policies for admin_users (service role only)
CREATE POLICY "Service role can manage admin users" 
  ON public.admin_users 
  FOR ALL 
  USING (auth.role() = 'service_role');

-- Insert sample projects
INSERT INTO public.projects (title, description, full_description, image_url, tags, live_url, github_url, published, display_order) VALUES
('E-Commerce Platform', 'Modern e-commerce platform with real-time inventory', 'A comprehensive e-commerce solution built with React and Node.js, featuring real-time inventory tracking, payment processing, and advanced analytics dashboard.', '/placeholder.svg', ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe'], 'https://example.com', 'https://github.com/example', true, 1),
('AI Chat Application', 'Real-time chat app with AI responses', 'An innovative chat application that integrates OpenAI''s GPT models for intelligent responses, built with WebSocket for real-time communication.', '/placeholder.svg', ARRAY['TypeScript', 'WebSocket', 'OpenAI', 'Redis'], 'https://example.com', 'https://github.com/example', true, 2),
('Analytics Dashboard', 'Data visualization dashboard with charts', 'A powerful analytics dashboard featuring interactive data visualizations, real-time updates, and customizable widgets for business intelligence.', '/placeholder.svg', ARRAY['Vue.js', 'D3.js', 'Python', 'FastAPI'], 'https://example.com', 'https://github.com/example', true, 3);
