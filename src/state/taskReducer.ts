import {TypeTaskState} from "../AppWithRedux";
import {PropsTypeTask} from "../ToDoList/ToDoList";
import {TypeAddTodolistAction, TypeRemoveTodolistAction} from "./todolistReducer";
import {v1} from "uuid";

export const removeTaskAC = (taskId: string, todolistId: string): TypeAction1 => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (title: string,todolistId: string): TypetAction2 => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId:string,isDone:boolean,todolistId: string,): TypetAction3 => {
    return {type: 'CHANGE_TASK', taskId,todolistId, isDone}
}
export const changeTaskTitleAC = (taskId:string,title:string,todolistId: string,): TypetAction4 => {
    return {type: 'CHANGE_TASK_TITLE', taskId, title, todolistId,}
}
export const AddTodilistAC = (title:string,):TypeAddTodolistAction=>{
    return { type:'ADD-TODOLIST',title,todolistId:v1()}
}
export const RemoveTodolistAC = (todolistId: string): TypeRemoveTodolistAction => {
    return {  type:'REMOVE-TODOLIST', id: todolistId}
}
type TypeAction1 = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type TypetAction2 = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
type TypetAction3 = {
    type: 'CHANGE_TASK'
    taskId:string
    isDone: boolean
    todolistId: string
}
type TypetAction4 = {
    type: 'CHANGE_TASK_TITLE'
    taskId:string
    title: string
    todolistId: string
}
let initilalState:TypeTaskState = {


}

export type ActionType = TypeAction1 | TypetAction2|TypetAction3|TypetAction4|TypeAddTodolistAction|TypeRemoveTodolistAction

export function taskReducer(state: TypeTaskState=initilalState, action: ActionType): TypeTaskState {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.taskId)
            return copyState
        }
        case 'ADD-TASK': {

            let newTask: PropsTypeTask = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        }
        case "CHANGE_TASK":{

            return {...state,
                [action.todolistId]:[...state[action.todolistId].map(task=>{
                    if(task.id===action.taskId){
                        task.isDone=action.isDone
                        return task
                    }
                    return  task
                })]
            }
        }
        case "CHANGE_TASK_TITLE":{
            return {...state,
                [action.todolistId]:[...state[action.todolistId].map(task=>{
                    if(task.id===action.taskId){
                        task.title=action.title
                        return task
                    }
                    return  task
                })]
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]:[]
            }
        }
        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.id]
            return copyState

        default:
            return state
    }


}
