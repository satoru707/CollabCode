import { create } from 'zustand';
import { Project, Workspace } from '../types';

interface WorkspaceState {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  currentProject: Project | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchWorkspaces: () => Promise<void>;
  createWorkspace: (name: string, description: string) => Promise<void>;
  setCurrentWorkspace: (workspaceId: string) => void;
  createProject: (name: string, description: string, language: string) => Promise<void>;
  setCurrentProject: (projectId: string) => void;
}

const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  workspaces: [],
  currentWorkspace: null,
  currentProject: null,
  isLoading: false,
  error: null,

  fetchWorkspaces: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, fetch from API
      // Mock data for demo
      const mockWorkspaces: Workspace[] = [
        {
          id: 'ws1',
          name: 'Personal Projects',
          description: 'My personal coding projects',
          projects: [
            {
              id: 'p1',
              name: 'React Todo App',
              description: 'A simple todo app built with React',
              language: 'typescript',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              ownerId: '1',
            },
            {
              id: 'p2',
              name: 'Node.js API',
              description: 'RESTful API with Express and MongoDB',
              language: 'javascript',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              ownerId: '1',
            },
          ],
          members: [
            {
              userId: '1',
              user: {
                id: '1',
                name: 'Test User',
                email: 'test@example.com',
                avatar: 'https://i.pravatar.cc/150?u=test@example.com',
              },
              role: 'owner',
              joinedAt: new Date().toISOString(),
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      set({ workspaces: mockWorkspaces, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch workspaces',
        isLoading: false,
      });
    }
  },

  createWorkspace: async (name, description) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, create via API
      const newWorkspace: Workspace = {
        id: `ws${Date.now()}`,
        name,
        description,
        projects: [],
        members: [
          {
            userId: '1',
            user: {
              id: '1',
              name: 'Test User',
              email: 'test@example.com',
              avatar: 'https://i.pravatar.cc/150?u=test@example.com',
            },
            role: 'owner',
            joinedAt: new Date().toISOString(),
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      set((state) => ({
        workspaces: [...state.workspaces, newWorkspace],
        currentWorkspace: newWorkspace,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create workspace',
        isLoading: false,
      });
    }
  },

  setCurrentWorkspace: (workspaceId) => {
    const { workspaces } = get();
    const workspace = workspaces.find((ws) => ws.id === workspaceId);
    set({ currentWorkspace: workspace || null });
  },

  createProject: async (name, description, language) => {
    set({ isLoading: true, error: null });
    try {
      const { currentWorkspace } = get();
      if (!currentWorkspace) throw new Error('No workspace selected');

      // In a real app, create via API
      const newProject: Project = {
        id: `p${Date.now()}`,
        name,
        description,
        language,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ownerId: '1',
      };

      const updatedWorkspace = {
        ...currentWorkspace,
        projects: [...currentWorkspace.projects, newProject],
      };

      set((state) => ({
        workspaces: state.workspaces.map((ws) =>
          ws.id === currentWorkspace.id ? updatedWorkspace : ws
        ),
        currentWorkspace: updatedWorkspace,
        currentProject: newProject,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create project',
        isLoading: false,
      });
    }
  },

  setCurrentProject: (projectId) => {
    const { currentWorkspace } = get();
    if (!currentWorkspace) return;
    
    const project = currentWorkspace.projects.find((p) => p.id === projectId);
    set({ currentProject: project || null });
  },
}));

export default useWorkspaceStore;