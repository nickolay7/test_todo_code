import {createContext, useState} from 'react';
import {nanoid} from "nanoid";
import AppHeader from '../appHeader';
import SearchPanel from '../searchPanel';
import TodoList from '../todoList';
import StatusFilter from '../statusFilter';
import AddTask from "../addTask/addTask";

import './app.css';

// interface IInitContext {
//     addTask: () => void,
//     todos: ITodoData[],
//     toDelete: () => void,
//     onToggleDone: () => void,
//     onToggleImportant: () => void,
//
// }

interface ITodoData {
    label: string,
    id: string,
    important: boolean,
    done: boolean,
}

enum FiltersNames {
    ALL = "all",
    ACTIVE = "active",
    DONE = "done"
}

enum TodoStatus {
    IMPORTANT = "important",
    DONE = "done"
}

const Context = createContext({});

const addItem = (label: string): ITodoData => {
    return {
        label,
        id: nanoid(),
        important: false,
        done: false,
    };
}

interface IAppState {
    itemData: ITodoData[],
    search: string,
    filter: FiltersNames
}

const init = {
    todoData: [
        addItem('Drink Coffee'),
        addItem('Make test todo App'),
        addItem('Get a job MindBox'),
    ],
    search: '',
    filter: FiltersNames.ALL,
};

const App = () => {

    const [tasks, setTask] = useState(init);

    const {search, todoData, filter} = tasks;

    const countDone = () => {
        return todoData.filter((i) => i.done).length;
    }

    const countToDo = () => {
        return todoData.length - countDone();
    }

    const toDelete = (id: string) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const copyOfData = todoData.slice();
        copyOfData.splice(idx, 1);
        setTask((prev) => ({...prev, todoData: copyOfData}));
    }

    const addTask = (text: string) => {
        if (text === '') {
            return;
        }
        const data = addItem(text);
        setTask((prev) => {
            const copyOfData = todoData.slice();
            const newArray = [...copyOfData, data];
            return ({...prev, todoData: newArray});
        });
    };

    const onToggleItem = (id: string, arr: ITodoData[], item: TodoStatus) => {
        const copyOfData = arr.slice();
        const idx = copyOfData.findIndex((el) => el.id === id);
        copyOfData[idx] = {...copyOfData[idx], [item]: !copyOfData[idx][item]}
        return copyOfData;
    }

    const onToggleImportant = (id: string) => {
        setTask((prev) => {
            return {...prev, todoData: onToggleItem(id, todoData, TodoStatus.IMPORTANT)};
        });
    }

    const onToggleDone = (id: string) => {
        setTask((prev) => {
            return {...prev, todoData: onToggleItem(id, todoData, TodoStatus.DONE)};
        });
    }

    const onSearch = (text: string) => {
        setTask((prev) => ({...prev, search: text}));
    }

    const searchItems = (items: ITodoData[], text: string) => {
        if (text === '') {
            return items;
        }

        return items.filter(({label}) => label.toLowerCase().indexOf(text.toLowerCase()) !== -1);
    }

    const filterItems = (name: FiltersNames, items: ITodoData[]) => {
        switch (name) {
            case FiltersNames.ALL:
                return items;
            case FiltersNames.ACTIVE:
                return items.filter(({done}) => !done);
            case FiltersNames.DONE:
                return items.filter(({done}) => done);
            default:
                break;
        }
    }

    const setFilter = (name: FiltersNames) => {
        setTask((prev) => ({...prev, filter: name}));
    }

    const visibleData = filterItems(filter, searchItems(todoData, search));

    return (
        <Context.Provider value={
            {
                addTask,
                todos: visibleData,
                toDelete,
                onToggleDone,
                onToggleImportant,
            }
        }>
            <div className="container">
                <AppHeader toDo={countToDo()} done={countDone()}/>
                <SearchPanel onSearch={onSearch}/>
                <StatusFilter setFilter={setFilter} active={filter}/>
                <TodoList/>
                <AddTask/>
            </div>
        </Context.Provider>
    );
}

export {Context, App};
