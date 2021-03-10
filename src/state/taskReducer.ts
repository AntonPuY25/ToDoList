import {TypeAddTodolistAction, TypeRemoveTodolistAction, TypeSetTodolistAction} from "./todolistReducer";
import {v1} from "uuid";
import GetApi, {PriorityType, TypeStatusTask, TypeTaskItems} from "../dall/todolists-api";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "./store";

export const removeTaskAC = (taskId: string, todoListId: string): TypeAction1 => {
    return {type: 'REMOVE-TASK', taskId, todoListId}
}
export const addTaskAC = (title: string, todoListId: string): TypetAction2 => {
    return {type: 'ADD-TASK', title, todoListId}
}
export const changeTaskStatusAC = (taskId: string, status: TypeStatusTask, todoListId: string,): TypetAction3 => {
    return {type: 'CHANGE_TASK', taskId, todoListId, status}
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string,): TypetAction4 => {
    return {type: 'CHANGE_TASK_TITLE', taskId, title, todoListId,}
}
export const AddTodilistAC = (title: string,): TypeAddTodolistAction => {
    return {type: 'ADD-TODOLIST', title, todoListId: v1()}
}
export const RemoveTodolistAC = (todoListId: string): TypeRemoveTodolistAction => {
    return {type: 'REMOVE-TODOLIST', id: todoListId}
}
export const getTasksAC = (todoListId: string,tasks:Array<TypeTaskItems>) => {
    return {type: 'GET-TASKS',  todoListId,tasks} as const
}
type TypeActionGetTasks = ReturnType<typeof getTasksAC>
type TypeAction1 = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListId: string
}
export type TypetAction2 = {
    type: 'ADD-TASK'
    title: string
    todoListId: string
}
type TypetAction3 = {
    type: 'CHANGE_TASK'
    taskId: string
    status: TypeStatusTask
    todoListId: string
}
type TypetAction4 = {
    type: 'CHANGE_TASK_TITLE'
    taskId: string
    title: string
    todoListId: string
}
export type TypeTaskReducer = {
    [key: string]: TypeTaskItems[]
}
let initilalState: TypeTaskReducer = {}

export type ActionType =
    TypeAction1
    | TypetAction2
    | TypetAction3
    | TypetAction4
    | TypeAddTodolistAction
    | TypeRemoveTodolistAction
    |TypeSetTodolistAction
    |TypeActionGetTasks

export function taskReducer(state: TypeTaskReducer = initilalState, action: ActionType): TypeTaskReducer {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todoListId] = copyState[action.todoListId].filter((task: TypeTaskItems) => task.id !== action.taskId)
            return copyState
        }
        case 'ADD-TASK': {
            let newTask: TypeTaskItems = {
                description: "",
                title: action.title,
                completed: true,
                status: TypeStatusTask.New,
                priority: PriorityType.Hi,
                startDate: "",
                deadline: "",
                id: v1(),
                todoListId: action.todoListId,
                order: 1,
                addedDate: "",
            };

            return {
                ...state,
                [action.todoListId]: [newTask, ...state[action.todoListId]]
            }
        }

        case "CHANGE_TASK": {
            return {
                ...state,
                [action.todoListId]: [...state[action.todoListId].map((task: TypeTaskItems) => {
                    if (task.id === action.taskId) {
                        task.status = action.status
                        return {...task}
                    }
                    return task
                })]
            }
        }
        case "CHANGE_TASK_TITLE": {
            return {
                ...state,

                [action.todoListId]: [...state[action.todoListId].map((task: TypeTaskItems) => {
                    if (task.id === action.taskId) {
                        task.title = action.title
                        return {...task}
                    }
                    return task
                })]
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todoListId]: []
            }
        }

        case 'REMOVE-TODOLIST':{
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }


        case "todolist_reducer/SET_TODOLISTS":{
            let copyState = {...state}
                action.todolists.forEach(td => {
                    copyState[td.id]=[]
            })
            return copyState;
        }
        case "GET-TASKS":{
            return{
                ...state,
                [action.todoListId]:action.tasks.map(task=>task)
            }
        }

        default:
            return state
    }
}

export const getTaskTC = (todoListId:string):ThunkAction<void, AppRootStateType, unknown, ActionType>=>
    async (dispatch)=>{
    let result = await  GetApi.getTasks(todoListId)
        dispatch(getTasksAC(todoListId,result.data.items))
}