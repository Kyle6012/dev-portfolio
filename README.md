
# Portfolio Web Application

A production-ready portfolio web application built with React, TypeScript, and Supabase.

## Features

### Public Portfolio
- **Responsive Design**: Mobile-first, fully responsive layout
- **Animated Hero Section**: Full-screen hero with developer tagline
- **Project Showcase**: Grid of project cards with lazy-loaded images
- **Interactive Filtering**: Search and tag-based filtering
- **Project Details**: Modal with full project information and links
- **Smooth Animations**: Framer Motion animations throughout

### Admin Panel
- **Secure Authentication**: JWT-based admin authentication
- **Project Management**: Full CRUD operations for projects
- **Drag & Drop Reordering**: Intuitive project ordering
- **Image Management**: Upload and manage project images
- **Form Validation**: Real-time validation with React Hook Form + Zod
- **Publish Toggle**: Control project visibility

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with dark/light mode
- **Animations**: Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Radix UI (shadcn/ui)
- **State Management**: React Query (TanStack Query)

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Cloudinary Account

# 🌩️ Cloudinary Setup Instructions

Follow these steps to configure Cloudinary for client-side uploads:

1. **Sign Up / Log In**
   - Go to [https://cloudinary.com/](https://cloudinary.com/) and sign up for a free account.

2. **Get Your Cloud Name**
   - After signing in, navigate to your **Dashboard**.
   - Your **Cloud Name** will be listed there.

3. **Create an Upload Preset**
   - Go to: **Settings → Upload → Upload presets**.
   - Click **"Add upload preset"**.

4. **Configure the Preset**
   - Name your preset (e.g., `unsigned_upload`).
   - Set the **Signing Mode** to `Unsigned`.
   - Configure any other options (e.g., allowed formats, folder, etc.).
   - Save the preset.

5. **Update Your Environment Variables**
   - Add the following to your `.env` file (for Vite or similar):
     ```env
     VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
     VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset_here
     ```
   - Replace with your actual values.
---

> ✅ You're now ready to upload images directly from the frontend using Cloudinary's unsigned upload method.


### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kyle6012/dev-portfolio.git
   cd dev-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Portfolio: http://localhost:5173
   - Admin: http://localhost:5173/admin/login

### Default Admin Credentials
- **Username**: admin
- **Password**: admin123

⚠️ **Change these credentials in production!**

## Database Setup

The application uses Supabase with the following tables:

- `projects`: Stores project information
- `admin_users`: Stores admin authentication data

Row Level Security (RLS) is enabled for data protection.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # Reusable components
│   ├── admin/          # Admin-specific components
│   └── ui/             # UI components (shadcn/ui)
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── lib/                # Utility functions
```

## Deployment

### Vercel (Recommended)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npx vercel
   ```

3. **Set environment variables** in Vercel dashboard

### Docker

1. **Build the Docker image**
   ```bash
   docker build -t dev-portfolio .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 dev-portfolio
   ```

## Configuration

### Changing Admin Credentials

1. **Update password hash in database**:
   ```sql
   UPDATE admin_users 
   SET password_hash = '$2a$10$your_new_bcrypt_hash'
   WHERE username = 'admin';
   ```

2. **Or update via the .env file** 

### Customization

- **Styling**: Modify `tailwind.config.ts` and CSS variables
- **Content**: Update project data via admin panel
- **Branding**: Replace logos and update social links in footer

## Security Features

- Row Level Security (RLS) enabled
- JWT-based authentication
- HTTP-only cookie sessions
- Input validation and sanitization
- CORS protection

## Performance

- Lazy loading for images
- Code splitting with React.lazy
- Optimized bundle size
- Progressive Web App ready

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support, please open an issue on GitHub or contact [bahati@g24sec.space]