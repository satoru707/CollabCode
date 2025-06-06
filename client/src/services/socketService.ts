import { io, Socket } from 'socket.io-client';
import useEditorStore from '../store/editorStore';
import useAuthStore from '../store/authStore';

class SocketService {
  private socket: Socket | null = null;
  private initialized = false;

  // Initialize socket connection
  init() {
    if (this.initialized) return;
    
    const token = useAuthStore.getState().token;
    if (!token) return;

    // In a real app, connect to your Socket.IO server
    // For demo, we'll use a mock URL (this won't actually connect)
    this.socket = io('https://api.collabcode.example', {
      auth: { token },
      autoConnect: false,
    });

    this.setupEventListeners();
    this.initialized = true;
  }

  // Connect to socket server
  connect() {
    if (!this.socket) this.init();
    this.socket?.connect();
    
    // For demo purposes, simulate connection success
    setTimeout(() => {
      useEditorStore.getState().setConnected(true);
    }, 1000);
  }

  // Disconnect from socket server
  disconnect() {
    this.socket?.disconnect();
    useEditorStore.getState().setConnected(false);
  }

  // Join a specific code session
  joinSession(sessionId: string, projectId: string) {
    if (!this.socket) return;
    
    const { user } = useAuthStore.getState();
    if (!user) return;
    
    this.socket.emit('join_session', { 
      sessionId, 
      projectId,
      userId: user.id,
      username: user.name
    });
    
    useEditorStore.getState().setSessionId(sessionId);
    useEditorStore.getState().setProjectId(projectId);
    
    // For demo purposes, simulate receiving initial code
    setTimeout(() => {
      const mockCode = `// CollabCode Session: ${sessionId}\n\nfunction welcome() {\n  console.log("Welcome to the collaborative session!");\n}\n\nwelcome();`;
      useEditorStore.getState().setCode(mockCode);
      
      // Simulate other users joining
      const colors = ['#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'];
      for (let i = 2; i <= 4; i++) {
        const mockUser = {
          id: `user${i}`,
          name: `User ${i}`,
          color: colors[i-2]
        };
        useEditorStore.getState().addCollaborator(mockUser.id, mockUser.name, mockUser.color);
      }
    }, 1500);
  }

  // Leave current session
  leaveSession() {
    if (!this.socket) return;
    
    const sessionId = useEditorStore.getState().sessionId;
    const { user } = useAuthStore.getState();
    
    if (sessionId && user) {
      this.socket.emit('leave_session', { 
        sessionId, 
        userId: user.id 
      });
    }
    
    useEditorStore.getState().setSessionId(null);
    useEditorStore.getState().setProjectId(null);
  }

  // Send code changes to all collaborators
  sendCodeChanges(changes: any) {
    if (!this.socket) return;
    
    const sessionId = useEditorStore.getState().sessionId;
    const { user } = useAuthStore.getState();
    
    if (!sessionId || !user) return;
    
    this.socket.emit('code_change', {
      sessionId,
      userId: user.id,
      changes,
      timestamp: Date.now()
    });
    
    // For demo purposes, simulate receiving the change back
    setTimeout(() => {
      useEditorStore.getState().setCode(changes);
    }, 50);
  }

  // Send cursor position updates
  sendCursorPosition(position: { lineNumber: number; column: number }) {
    if (!this.socket) return;
    
    const sessionId = useEditorStore.getState().sessionId;
    const { user } = useAuthStore.getState();
    
    if (!sessionId || !user) return;
    
    this.socket.emit('cursor_move', {
      sessionId,
      userId: user.id,
      username: user.name,
      position,
      timestamp: Date.now()
    });
  }

  // Send chat messages
  sendChatMessage(content: string) {
    if (!this.socket) return;
    
    const sessionId = useEditorStore.getState().sessionId;
    const { user } = useAuthStore.getState();
    
    if (!sessionId || !user) return;
    
    const message = {
      id: `msg_${Date.now()}`,
      sessionId,
      userId: user.id,
      username: user.name,
      content,
      timestamp: Date.now()
    };
    
    this.socket.emit('chat_message', message);
    
    // For demo, add message directly to store
    useEditorStore.getState().addChatMessage(message);
  }

  // Set up socket event listeners
  private setupEventListeners() {
    if (!this.socket) return;
    
    this.socket.on('connect', () => {
      useEditorStore.getState().setConnected(true);
    });
    
    this.socket.on('disconnect', () => {
      useEditorStore.getState().setConnected(false);
    });
    
    this.socket.on('code_change', (data) => {
      useEditorStore.getState().setCode(data.changes);
    });
    
    this.socket.on('cursor_move', (data) => {
      const { userId, username, position, color } = data;
      useEditorStore.getState().updateCursorPosition(userId, username, position, color);
    });
    
    this.socket.on('user_joined', (data) => {
      const { userId, username, color } = data;
      useEditorStore.getState().addCollaborator(userId, username, color);
    });
    
    this.socket.on('user_left', (data) => {
      const { userId } = data;
      useEditorStore.getState().removeCollaborator(userId);
      useEditorStore.getState().removeCursorPosition(userId);
    });
    
    this.socket.on('chat_message', (message) => {
      useEditorStore.getState().addChatMessage(message);
    });
  }
}

// Create singleton instance
const socketService = new SocketService();

export default socketService;