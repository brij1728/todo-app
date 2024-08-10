import { Checkbox, IconButton, TextField } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newText: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleSave = () => {
    onUpdate(id, newText);
    setIsEditing(false);
  };

  return (
    <div className='flex items-center justify-between p-2 border-b'>
      <div className='flex items-center'>
        <Checkbox checked={completed} onChange={() => onToggle(id)} />
        {isEditing ? (
          <TextField
            value={newText}
            onChange={e => setNewText(e.target.value)}
          />
        ) : (
          <span className={completed ? 'line-through' : ''}>{text}</span>
        )}
      </div>
      <div>
        {isEditing ? (
          <IconButton onClick={handleSave}>
            <SaveIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => setIsEditing(true)}>
            <EditIcon />
          </IconButton>
        )}
        <IconButton onClick={() => onDelete(id)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};
