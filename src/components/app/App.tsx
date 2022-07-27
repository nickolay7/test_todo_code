import AppHeader from '../appHeader';
import { SearchPanel } from '../searchPanel';
import { TodoList } from '../todoList';
import { StatusFilter } from '../statusFilter';
import { AddTask } from "../addTask/addTask";
import {ITodoData, useAppContext} from "../../api/contextProvider";

import './app.css';

export const App = () => {

    const { todoData } = useAppContext();

    const countDone = () => {
        return todoData.filter((i: ITodoData) => i.done).length;
    }

    const countToDo = () => {
        return todoData.length - countDone();
    }

    return (
        <div className="container">
            <AppHeader toDo={countToDo()} done={countDone()}/>
            <SearchPanel />
            <StatusFilter />
            <TodoList/>
            <AddTask/>
        </div>
    );
}
