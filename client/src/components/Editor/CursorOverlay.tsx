import React, { useEffect, useState } from 'react';
import useEditorStore from '../../store/editorStore';
import useAuthStore from '../../store/authStore';
import { CursorPosition } from '../../types';

interface CursorOverlayProps {
  editor: any;
  monaco: any;
}

interface CursorWidgetState {
  userId: string;
  lineNumber: number;
  widget: any;
}

const CursorOverlay: React.FC<CursorOverlayProps> = ({ editor, monaco }) => {
  const { cursorPositions } = useEditorStore();
  const { user } = useAuthStore();
  const [cursorWidgets, setCursorWidgets] = useState<CursorWidgetState[]>([]);

  // Update cursor positions when they change
  useEffect(() => {
    if (!editor || !monaco) return;
    
    // Clean up old widgets
    cursorWidgets.forEach(widget => {
      editor.removeContentWidget(widget.widget);
    });
    
    // Create new widgets for each cursor position
    const newWidgets = cursorPositions
      .filter(cursor => cursor.userId !== user?.id) // Don't show current user's cursor
      .map(cursor => {
        const domNode = document.createElement('div');
        domNode.className = 'cursor-widget';
        domNode.style.position = 'absolute';
        domNode.style.zIndex = '1000';
        domNode.style.pointerEvents = 'none';
        
        // Cursor line
        const cursorLine = document.createElement('div');
        cursorLine.style.position = 'absolute';
        cursorLine.style.width = '2px';
        cursorLine.style.height = '18px';
        cursorLine.style.backgroundColor = cursor.color;
        domNode.appendChild(cursorLine);
        
        // User label
        const label = document.createElement('div');
        label.textContent = cursor.username;
        label.style.position = 'absolute';
        label.style.top = '-20px';
        label.style.left = '0';
        label.style.backgroundColor = cursor.color;
        label.style.color = 'white';
        label.style.padding = '2px 4px';
        label.style.borderRadius = '2px';
        label.style.fontSize = '10px';
        label.style.whiteSpace = 'nowrap';
        domNode.appendChild(label);
        
        // Create the cursor widget
        const widget = {
          domNode,
          getId: () => `cursor-${cursor.userId}`,
          getDomNode: () => domNode,
          getPosition: () => ({
            position: {
              lineNumber: cursor.position.lineNumber,
              column: cursor.position.column,
            },
            preference: [monaco.editor.ContentWidgetPositionPreference.EXACT],
          }),
        };
        
        // Add the widget to the editor
        editor.addContentWidget(widget);
        
        return {
          userId: cursor.userId,
          lineNumber: cursor.position.lineNumber,
          widget,
        };
      });
    
    setCursorWidgets(newWidgets);
    
    // Clean up widgets when component unmounts
    return () => {
      cursorWidgets.forEach(widget => {
        editor.removeContentWidget(widget.widget);
      });
    };
  }, [cursorPositions, editor, monaco, user]);

  return null; // This component doesn't render anything directly
};

export default CursorOverlay;