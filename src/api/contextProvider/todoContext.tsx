import {createContext, Dispatch, ReactElement, SetStateAction} from "react";
import {nanoid} from "nanoid";

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

interface IAppState {
    itemData: ITodoData[],
    search: string,
    filter: FiltersNames
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

const addTask = (text: string, setTask: Dispatch<SetStateAction<IAppState>>, todoData: ITodoData[]) => {
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

const toDelete = (id: string, todoData: ITodoData[], setTask: Dispatch<SetStateAction<IAppState>>) => {
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

const onToggleImportant = (id: string,  todoData: ITodoData[], setTask: Dispatch<SetStateAction<IAppState>>) => {
    setTask((prev) => {
        return {...prev, todoData: onToggleItem(id, todoData, TodoStatus.IMPORTANT)};
    });
}

const onToggleDone = (id: string,  todoData: ITodoData[], setTask: Dispatch<SetStateAction<IAppState>>) => {
    setTask((prev) => {
        return {...prev, todoData: onToggleItem(id, todoData, TodoStatus.DONE)};
    });
}

const ContextProvider = ({ children, visibleData }: { children: ReactElement, visibleData: ITodoData[] }) => (<Context.Provider value={
    {
        addTask,
        todos: visibleData,
        toDelete,
        onToggleDone,
        onToggleImportant,

    }
}>{children}</Context.Provider>);

export default ContextProvider;