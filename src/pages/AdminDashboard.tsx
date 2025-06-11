
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminProjects } from '@/hooks/useProjects';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ProjectFormComponent } from '@/components/admin/ProjectForm';
import { DraggableProjectList } from '@/components/admin/DraggableProjectList';
import { Project } from '@/types/project';
import { Plus, LogOut } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { projects, loading, createProject, updateProject, deleteProject, reorderProjects } = useAdminProjects();
  const { logout } = useAuth();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleCreateProject = async (data: any) => {
    setFormLoading(true);
    try {
      await createProject({
        ...data,
        display_order: projects.length + 1,
      });
      toast({
        title: 'Success',
        description: 'Project created successfully',
      });
      setShowForm(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create project',
        variant: 'destructive',
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateProject = async (data: any) => {
    if (!editingProject) return;
    
    setFormLoading(true);
    try {
      await updateProject(editingProject.id, data);
      toast({
        title: 'Success',
        description: 'Project updated successfully',
      });
      setEditingProject(null);
      setShowForm(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update project',
        variant: 'destructive',
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId);
        toast({
          title: 'Success',
          description: 'Project deleted successfully',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete project',
          variant: 'destructive',
        });
      }
    }
  };

  const handleReorderProjects = async (projectIds: string[]) => {
    try {
      await reorderProjects(projectIds);
      toast({
        title: 'Success',
        description: 'Projects reordered successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reorder projects',
        variant: 'destructive',
      });
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button onClick={logout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Projects ({projects.length})
                <Button onClick={() => setShowForm(true)} disabled={showForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showForm ? (
                <ProjectFormComponent
                  project={editingProject || undefined}
                  onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
                  onCancel={handleCancelForm}
                  isLoading={formLoading}
                />
              ) : (
                <DraggableProjectList
                  projects={projects}
                  onReorder={handleReorderProjects}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
