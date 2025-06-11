
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/hooks/useProjects';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectModal } from '@/components/ProjectModal';
import { ProjectFilters } from '@/components/ProjectFilters';
import { Project } from '@/types/project';

const Index = () => {
  const { projects, loading } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  // Get all unique tags
  const allTags = [...new Set(projects.flatMap(project => project.tags))];

  // Filter projects based on search and tags
  useEffect(() => {
    let filtered = projects.filter(project => 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedTags.length > 0) {
      filtered = filtered.filter(project =>
        selectedTags.every(tag => project.tags.includes(tag))
      );
    }

    setFilteredProjects(filtered);
  }, [searchTerm, selectedTags, projects]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent"
          >
            Meshack Bahati
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
          >
            Crafting exceptional digital experiences with modern technologies.
            <br />
            Passionate about clean code, user experience, and innovative solutions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Button size="lg" className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90" onClick={scrollToProjects}>
              View My Work
            </Button>
            <Button variant="outline" size="lg" className="border-primary/20 hover:border-primary/40" onClick={scrollToContact}>
              Contact Me
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Floating Animation Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A collection of my recent work, showcasing various technologies and problem-solving approaches.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <ProjectFilters
            searchTerm={searchTerm}
            selectedTags={selectedTags}
            allTags={allTags}
            onSearchChange={setSearchTerm}
            onTagToggle={toggleTag}
          />

          {/* Project Grid */}
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              layout
            >
              <AnimatePresence>
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Footer */}
      <footer id="contact" className="py-12 px-4 border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold">Let's Build Something Amazing Together</h3>
            <p className="text-muted-foreground">
              Always open to discussing new opportunities and interesting projects.
            </p>
            <div className="flex justify-center gap-6">
              {[
                { icon: Github, href: "https://github.com/Kyle6012", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Mail, href: "mailto:bahati@g24sec.space", label: "Email" }
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Portfolio. Built by Meshack Bahati.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
