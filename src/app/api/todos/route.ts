import { NextResponse } from 'next/server';
import { Todo } from '../../../types';

const todos: Todo[] = [];

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const { text } = await req.json();
  const newTodo: Todo = { id: Date.now(), text, completed: false };
  todos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}
