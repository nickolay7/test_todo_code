import { ChangeEvent } from 'react';
import {useAppContext} from "../../api/contextProvider";

import './searchPanel.css'

export const SearchPanel = () => {
    const { onSearch } = useAppContext();

    const changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
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
