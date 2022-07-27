import React, { useState, useContext } from 'react';
import './addTask.css';
import { Context } from '../app'

const AddTask = () => {
  const [value, setValue] = useState('');
  const { addTask } = useContext(Context);
  console.log()
  // const [tasks, setTask] = useState([]);

  const changeHandle = (e) => {
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
          // setTask((prev) => [...prev, value]);
        }}
      >Add task
      </button>
    </div>
  );
}

export default AddTask;
