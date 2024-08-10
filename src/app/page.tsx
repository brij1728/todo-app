'use client';
// import { Button } from '@/components/ui';

// export default function Home() {
//   return (
//     <div className='max-w-lg mx-auto mt-10'>
//       <h1 className='text-4xl font-bold mb-4'>My To-Do List</h1>{' '}
//       <Button variant='contained' color='secondary'>
//         Hello World
//       </Button>
//     </div>
//   );
// }

import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

import { Todo } from '../types';
import { TodoList } from '@/components';

const HomePage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    fetch('/api/todos')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTodo }),
      });
      const newTodoItem = await res.json();
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const handleToggleTodo = async (id: number) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (todoToUpdate) {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...todoToUpdate,
          completed: !todoToUpdate.completed,
        }),
      });
      const updatedTodo = await res.json();
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    }
  };

  const handleDeleteTodo = async (id: number) => {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleUpdateTodo = async (id: number, newText: string) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (todoToUpdate) {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...todoToUpdate, text: newText }),
      });
      const updatedTodo = await res.json();
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    }
  };

  return (
    <div className='max-w-lg mx-auto mt-10'>
      <h1 className='text-4xl font-bold mb-4'>My To-Do List</h1>
      <div className='flex items-center mb-4'>
        <TextField
          variant='outlined'
          fullWidth
          label='New Task'
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={handleAddTodo}
          className='ml-2'
        >
          Add
        </Button>
      </div>
      <TodoList
        todos={todos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
        onUpdate={handleUpdateTodo}
      />
    </div>
  );
};

export default HomePage;
