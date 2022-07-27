import React, {ChangeEvent, useState} from 'react';
import {useAppContext} from "../../api/contextProvider";

import './addTask.css';

export const AddTask = () => {
  const [value, setValue] = useState('');
  const { addTask } = useAppContext();

  const changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  }

  return (
    <div className="add">
      <input
        type="text"
        placeholder="add task..."
        className="form-control input-item addInput"
        onChange={changeHandle}
        value={value}
      />
      <button
        className="btn btn-outline-secondary addTask"
        onClick={() => {
          addTask(value);
          setValue('');
        }}
      >Add task
      </button>
    </div>
  );
}
