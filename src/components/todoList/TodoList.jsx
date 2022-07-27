import React, { useContext } from 'react';
import TodoListItem from "../todoListItem";
import { Context } from '../app'

export default function TodoList() {
  const { todos } = useContext(Context);
  const elements = todos.map((task) => {
    return (
      <li key={ task.id } className="list-group-item">
        <TodoListItem { ...task }
        />
      </li>);
  });
  return (
    <div className="todo-list">
      <ul className="list-group">
        {elements}
      </ul>
    </div>

  );
}
