import {TypeAddTodolistAction, TypeRemoveTodolistAction, TypeSetTodolistAction} from "./todolistReducer";
import GetApi, {PropertiesType, TypeStatusTask, TypeTaskItems, TypeTodolist} from "../dall/todolists-api";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "./store";

export const removeTaskAC = (taskId: string, todoListId: string): TypeAction1 => {
    return {type: 'REMOVE-TASK', taskId, todoListId}
}
export const addTaskAC = (task: TypeTaskItems): TypetAction2 => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskAC = (task: TypeTaskItems): TypetAction3 => {
    return {type: 'CHANGE_TASK', task}
}

export const AddTodilistAC = (todolist: TypeTodolist): TypeAddTodolistAction => {
    return {type: 'ADD-TODOLIST', todolist,}
}
export const RemoveTodolistAC = (todoListId: string): TypeRemoveTodolistAction => {
    return {type: 'REMOVE-TODOLIST', id: todoListId}
}
export const getTasksAC = (todoListId: string, tasks: Array<TypeTaskItems>) => {
    return {type: 'GET-TASKS', todoListId, tasks} as const
}
type TypeActionGetTasks = ReturnType<typeof getTasksAC>
type TypeAction1 = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListId: string
}
export type TypetAction2 = {
    type: 'ADD-TASK'
    task: TypeTaskItems
}
type TypetAction3 = {
    type: 'CHANGE_TASK'
    task: TypeTaskItems
}

export type TypeTaskReducer = {
    [key: string]: TypeTaskItems[]
}
let initilalState: TypeTaskReducer = {}

export type ActionType =
    TypeAction1
    | TypetAction2
    | TypetAction3
    | TypeAddTodolistAction
    | TypeRemoveTodolistAction
    | TypeSetTodolistAction
    | TypeActionGetTasks

export function taskReducer(state: TypeTaskReducer = initilalState, action: ActionType): TypeTaskReducer {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todoListId] = copyState[action.todoListId].filter((task: TypeTaskItems) => task.id !== action.taskId)
            return copyState
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }

        }

        case "CHANGE_TASK": {
            const copyState = {...state}
            let result = copyState[action.task.todoListId].map(ts => {
                if (ts.id === action.task.id) {
                    ts = action.task
                    return ts
                }
                return ts
            })
            return {
                ...state,
                [action.task.todoListId]: result
            }
        }

        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }

        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }


        case "todolist_reducer/SET_TODOLISTS": {
            let copyState = {...state}
            action.todolists.forEach(td => {
                copyState[td.id] = []
            })
            return copyState;
        }
        case "GET-TASKS": {
            return {
                ...state,
                [action.todoListId]: action.tasks.map(task => task)
            }
        }

        default:
            return state
    }
}

export const getTaskTC = (todoListId: string): ThunkAction<void, AppRootStateType, unknown, ActionType> =>
    async (dispatch) => {
        let result = await GetApi.getTasks(todoListId)
        dispatch(getTasksAC(todoListId, result.data.items))
    }


export const addTaskTC = (todoListId: string, title: string): ThunkAction<void, AppRootStateType, unknown, ActionType> =>
    async (dispatch) => {
        let task = await GetApi.createTask(todoListId, title)
        dispatch(addTaskAC(task.data.data.item))

    }

export const removeTaskTC = (todoListId: string, taskId: string): ThunkAction<void, AppRootStateType, unknown, ActionType> =>
    (dispatch) => {

        GetApi.deleteTask(todoListId, taskId)
            .then(res => {
                dispatch(removeTaskAC(taskId, todoListId))

            })
    }

export const updateTaskTC = (todoListId: string, taskId: string, title: string): ThunkAction<void, AppRootStateType, unknown, ActionType> =>

    async (dispatch, getState) => {
        const tasks = getState().tasks
        const task = tasks[todoListId].find(ts => ts.id === taskId)

        if (task) {
            const model: PropertiesType = {
                title: title,
                description: task.description,
                completed: task.completed,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,


            }
            let result = await GetApi.updateTask(task.todoListId, task.id, model)
            dispatch(changeTaskAC(result.data.data.item))
        }

    }
export const updateTask1TC = (todoListId: string, taskId: string, status: TypeStatusTask): ThunkAction<void, AppRootStateType, unknown, ActionType> =>
    async (dispatch, getState) => {
        const tasks = getState().tasks
        const task = tasks[todoListId].find(ts => ts.id === taskId)

        if (task) {
            const model: PropertiesType = {
                title: task.title,
                description: task.description,
                completed: task.completed,
                status: status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,

            }
            let result = await GetApi.updateTask(task.todoListId, task.id, model)
            dispatch(changeTaskAC(result.data.data.item))
        }

    }