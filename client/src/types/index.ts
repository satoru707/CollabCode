export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface EditorPosition {
  lineNumber: number;
  column: number;
}

export interface CursorPosition {
  userId: string;
  username: string;
  position: EditorPosition;
  color: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  language: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  projects: Project[];
  members: WorkspaceMember[];
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceMember {
  userId: string;
  user: User;
  role: 'owner' | 'editor' | 'viewer';
  joinedAt: string;
}

export interface CodeSession {
  id: string;
  projectId: string;
  startedAt: string;
  endedAt?: string;
  participants: User[];
}

export interface EditorChange {
  sessionId: string;
  userId: string;
  timestamp: number;
  changes: any[]; // Monaco editor change type
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  userId: string;
  username: string;
  content: string;
  timestamp: number;
}

export interface AICodeHelp {
  code: string;
  language: string;
  explanation: string;
  suggestions?: string[];
}