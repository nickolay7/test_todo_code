import { createContext, useState } from "react";
import { nanoid } from "nanoid";

export interface ITodoData {
    label: string,
    id: string,
    important: boolean,
    done: boolean,
}

export enum FiltersNames {
    ALL = "all",
    ACTIVE = "active",
    DONE = "done"
}

enum TodoStatus {
    IMPORTANT = "important",
    DONE = "done"
}

interface IInitContext {
    todoData: ITodoData[],
    todos?: ITodoData[],
    search: string,
    onSearch: (text: string) => void,
    filter: FiltersNames,
    setFilter: (name: FiltersNames) => void,
    addTask: (text: string) => void,
    toDelete: (id: string) => void,
    onToggleDone: (id: string) => void,
    onToggleImportant: (id: string) => void,

}

export const Context = createContext({} as IInitContext);

const addItem = (label: string): ITodoData => {
    return {
        label,
        id: nanoid(),
        important: false,
        done: false,
    };
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


export const AppContext = ({children}: { children: JSX.Element }) => {
    const [tasks, setTask] = useState(init);
    const {search, todoData, filter} = tasks;

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

    const toDelete = (id: string) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const copyOfData = todoData.slice();
        copyOfData.splice(idx, 1);
        setTask((prev) => ({...prev, todoData: copyOfData}));
    }

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

    const value: IInitContext = {
        todoData,
        todos: visibleData,
        search,
        onSearch,
        filter,
        setFilter,
        addTask,
        toDelete,
        onToggleDone,
        onToggleImportant,
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
}
