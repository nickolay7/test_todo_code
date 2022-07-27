import { useContext } from 'react';
import { Context } from '../app'
import './todoListItem.css';

export default function TodoListItem(
  {
    id,
    label,
    done,
    important,
  }) {
  const { toDelete, onToggleDone, onToggleImportant } = useContext(Context);
  let className = 'todo-list-item';
  if (done) {
    className += ' done';
  }
  if (important) {
    className += ' important';
  }

  return (
    <div className={className}>
    <span
      className="todo-list-item-label"
      onClick={() => onToggleDone(id)}
    >
      {label}
    </span>
      <button
        type="button"
        className="btn btn-outline-success btn-sm float-right"
        onClick={() => onToggleImportant(id)}
      >
        <i className="fa fa-exclamation" />
      </button>
      <button
        type="button"
        className="btn btn-outline-danger btn-sm float-right"
        onClick={() => toDelete(id)}
      >
        <i className="fa fa-trash-o" />
      </button>
    </div>
  );
}
