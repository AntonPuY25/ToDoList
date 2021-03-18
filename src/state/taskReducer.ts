import {TypeAddTodolistAction, TypeRemoveTodolistAction, TypeSetTodolistAction} from "./todolistReducer";
import GetApi, {PropertiesType, TypeStatusTask, TypeTaskItems, TypeTodolist} from "../dall/todolists-api";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "./store";
import {setErrorAC, setStatusAC, TypeSetErrorAction, TypeSetStatusAction} from "../app/appReducer";

export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {type: 'REMOVE-TASK', taskId, todoListId} as const
}
export const addTaskAC = (task: TypeTaskItems) => {
    return {type: 'ADD-TASK', task} as const
}
export const changeTaskAC = (task: TypeTaskItems) => {
    return {type: 'CHANGE_TASK', task} as const
}
export const changeTaskDisabledAC = (taskId:string,todoListId:string,disabled: boolean) => {
    return {type: 'CHANGE_DISABLED', taskId,todoListId,disabled} as const
}
export const AddTodilistAC = (todolist: TypeTodolist) => {
    return {type: 'ADD-TODOLIST', todolist,} as const
}
export const RemoveTodolistAC = (todoListId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todoListId} as const
}
export const getTasksAC = (todoListId: string, tasks: Array<TypeTaskItems>) => {
    return {type: 'GET-TASKS', todoListId, tasks} as const
}
let initilalState: TypeTaskReducer = {}

export function taskReducer(state: TypeTaskReducer = initilalState, action: ActionType): TypeTaskReducer {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todoListId]: [...state[action.todoListId].filter((task: TypeTaskItems) => task.id !== action.taskId)]
            }
        }

        case 'ADD-TASK': {
            return {
                ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
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
        case "CHANGE_DISABLED":{
            const copyState = {...state}
            let result = copyState[action.todoListId].map(ts => {
                if (ts.id === action.taskId) {
                    ts.disabledStatus = action.disabled
                    return ts
                }
                return ts
            })
            return {
                ...state,
                [action.todoListId]: result
            }
        }


        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }

        case 'REMOVE-TODOLIST': {
            return {
                delete: state[action.id],
                ...state

            }
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

export const getTaskTC = (todoListId: string): ThunkAction<void, AppRootStateType, unknown,
    ActionType | TypeSetStatusAction | TypeSetErrorAction> =>
    async (dispatch) => {
        dispatch(setStatusAC("loading"))
        let result = await GetApi.getTasks(todoListId)
        try {
            if (!result.data.error) {
                dispatch(getTasksAC(todoListId, result.data.items))
                dispatch(setStatusAC("succeeded"))
            } else {
                throw new Error("Some Error")
            }

        } catch (e) {
            dispatch(setStatusAC("error"))
            dispatch(setErrorAC(e))

        }


    }


export const addTaskTC = (todoListId: string, title: string): ThunkAction<void,
    AppRootStateType, unknown, ActionType | TypeSetErrorAction | TypeSetStatusAction> =>
    async (dispatch) => {
        try {
            dispatch(setStatusAC("loading"))
            let task = await GetApi.createTask(todoListId, title)
            if (task.data.resultCode === 0) {
                dispatch(addTaskAC(task.data.data.item))
                dispatch(setStatusAC("succeeded"))
            } else {
                dispatch(setStatusAC("error"))
                throw new Error(task.data.messages[0])

            }
        } catch (e) {
            dispatch(setErrorAC(e.toString()))
            dispatch(setStatusAC("error"))

        }


    }

export const removeTaskTC = (todoListId: string, taskId: string): ThunkAction<void, AppRootStateType,
    unknown, ActionType | TypeSetErrorAction | TypeSetStatusAction> =>
    (dispatch) => {
        dispatch(setStatusAC("loading"))
        dispatch(changeTaskDisabledAC(taskId,todoListId,true))
        GetApi.deleteTask(todoListId, taskId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC(taskId, todoListId))
                    dispatch(setStatusAC("succeeded"))
                    dispatch(changeTaskDisabledAC(taskId,todoListId,false))

                } else {
                    dispatch(setStatusAC("error"))
                    dispatch(changeTaskDisabledAC(taskId,todoListId,false))
                    throw new Error(res.data.messages[0])
                }
            })
            .catch(e => {
                dispatch(setErrorAC(e.toString()))
                dispatch(setStatusAC("error"))

            })
    }

export const updateTaskTitleTC = (todoListId: string, taskId: string, title: string):
    ThunkAction<void,
        AppRootStateType, unknown, ActionType|TypeSetStatusAction|TypeSetErrorAction> =>

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
         try{
             dispatch(setStatusAC("loading"))
             let result = await GetApi.updateTask(task.todoListId, task.id, model)
             if(result.data.resultCode===0){
                 dispatch(changeTaskAC(result.data.data.item))
                 dispatch(setStatusAC("succeeded"))
             }else{
                 dispatch(setStatusAC("error"))
                 throw new Error(result.data.messages[0])
             }
         }catch (e) {
                dispatch(setErrorAC(e.toString()))
               dispatch(setStatusAC("error"))

         }
        }

    }
export const updateTaskStatusTC =
    (todoListId: string, taskId: string, status: TypeStatusTask):
        ThunkAction<void, AppRootStateType, unknown, ActionType|TypeSetStatusAction|TypeSetErrorAction> =>
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
        try{
            dispatch(setStatusAC("loading"))
            let result = await GetApi.updateTask(task.todoListId, task.id, model)
            if(result.data.resultCode===0){
                dispatch(changeTaskAC(result.data.data.item))
                dispatch(setStatusAC("succeeded"))
            }else{
                dispatch(setStatusAC("error"))
                throw new Error(result.data.messages[0])
            }
        }catch (e) {
            dispatch(setErrorAC(e.toString()))
            dispatch(setStatusAC("error"))

        }

    } }

export type TypeTaskReducer = {
    [key: string]: TypeTaskItems[]
}
export type TypeTaskDisabledButton = ReturnType<typeof changeTaskDisabledAC>
export type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskAC>
    | TypeAddTodolistAction
    | TypeRemoveTodolistAction
    | TypeSetTodolistAction
    | ReturnType<typeof getTasksAC>
    |TypeTaskDisabledButton

