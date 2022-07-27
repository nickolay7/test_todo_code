import React from 'react';
import './searchPanel.css'

export default function SearchPanel(props) {
  const changeHandle = (e) => {
    props.onSearch(e.target.value);
  }

  return (
    <div className="search">
      <input
        placeholder="search"
        className="form-control input-item"
        onInput={changeHandle}
      />
    </div>
  );
}
