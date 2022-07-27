import React from 'react';
import './appHeader.css';

export default function AppHeader({ toDo, done}) {
  return (
    <div className="header app-header d-flex">
      <h1>Todo Application</h1>
      <h2>{toDo} more to do, {done} done</h2>
    </div>
  );
}