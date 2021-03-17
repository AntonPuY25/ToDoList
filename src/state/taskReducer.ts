import {TypeAddTodolistAction, TypeRemoveTodolistAction, TypeSetTodolistAction} from "./todolistReducer";
import GetApi, {PropertiesType, TypeStatusTask, TypeTaskItems, TypeTodolist} from "../dall/todolists-api";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "./store";
import {setErrorAC, setStatusAC, TypeSetErrorAction, TypeSetStatusAction} from "../app/appReducer";

export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {type: 'REMOVE-TASK', taskId, todoListId} as const
}
export const addTaskAC = (task: TypeTaskItems) => {
    return {type: 'ADD-TASK', task}  as const
}
export const changeTaskAC = (task: TypeTaskItems) => {
    return {type: 'CHANGE_TASK', task}  as const
}
export const AddTodilistAC = (todolist: TypeTodolist) => {
    return {type: 'ADD-TODOLIST', todolist,}  as const
}
export const RemoveTodolistAC = (todoListId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todoListId}  as const
}
export const getTasksAC = (todoListId: string, tasks: Array<TypeTaskItems>) => {
    return {type: 'GET-TASKS', todoListId, tasks} as const
}
let initilalState: TypeTaskReducer = {}

export function taskReducer(state: TypeTaskReducer = initilalState, action: ActionType): TypeTaskReducer {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state,
                [action.todoListId]:[...state[action.todoListId].filter((task: TypeTaskItems) => task.id !== action.taskId)]
            }}

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

        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }

        case 'REMOVE-TODOLIST': {
            return {
               delete :state[action.id],
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
    ActionType|TypeSetStatusAction> =>
    async (dispatch) => {
        dispatch(setStatusAC("loading"))
        let result = await GetApi.getTasks(todoListId)
        dispatch(getTasksAC(todoListId, result.data.items))
        dispatch(setStatusAC("successed"))

    }


export const addTaskTC = (todoListId: string, title: string): ThunkAction<void,
    AppRootStateType, unknown, ActionType|TypeSetErrorAction> =>
     async (dispatch) => {
         try {
             let task = await  GetApi.createTask(todoListId,title)
             if(task.data.resultCode===0){
               dispatch(addTaskAC(task.data.data.item))
            }else {
               throw new Error(task.data.messages[0])
             }
         }catch (e) {
             dispatch(setErrorAC(e.toString()))
         }


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

export type TypeTaskReducer = {
    [key: string]: TypeTaskItems[]
}

export type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskAC>
    | TypeAddTodolistAction
    | TypeRemoveTodolistAction
    | TypeSetTodolistAction
    | ReturnType<typeof getTasksAC>

