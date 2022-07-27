import { useAppContext } from '../../api/contextProvider';
import { TodoListItem } from "../todoListItem";

export const TodoList = () => {
  const { todos } = useAppContext();
  const elements = todos && todos.map((task) => {
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
