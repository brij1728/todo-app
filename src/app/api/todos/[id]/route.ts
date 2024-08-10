import { NextResponse } from 'next/server';
import { Todo } from '../../../../types';

let todos: Todo[] = [];

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const { text, completed } = await req.json();
  const todoId = parseInt(id, 10);
  const todoIndex = todos.findIndex(todo => todo.id === todoId);

  if (todoIndex !== -1) {
    todos[todoIndex] = { ...todos[todoIndex], text, completed };
    return NextResponse.json(todos[todoIndex]);
  }

  return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const todoId = parseInt(id, 10);
  todos = todos.filter(todo => todo.id !== todoId);
  return NextResponse.json({}, { status: 204 });
}
