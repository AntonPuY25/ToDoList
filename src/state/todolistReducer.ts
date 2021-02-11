import {FilterTypes, ToDoListsType} from "../AppWithRedux";
import {v1} from "uuid";

export const RemoveTodolistAC = (todolistId: string): TypeRemoveTodolistAction => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodilistAC = (title: string): TypeAddTodolistAction => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}


export const ChangeToddolistAC = (id: string, title: string): TypeChangeTodoolistAction => {
    return {
        type: "CHANGE_TODOLIST_TITLE",
        id,
        title
    }
}
export const changeTodolistFilterAC = (id: string, filter: FilterTypes): TypeChangeTodoolistFilterAction => {
    return {
        type: "CHANGE_TODOLIST_FILTER",
        id,
        filter
    }
}
export type TypeRemoveTodolistAction = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type TypeAddTodolistAction = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
type TypeChangeTodoolistAction = {
    type: "CHANGE_TODOLIST_TITLE"
    id: string
    title: string
}
type TypeChangeTodoolistFilterAction = {
    type: "CHANGE_TODOLIST_FILTER"
    id: string
    filter: FilterTypes
}
let initialState: Array<ToDoListsType> = []
export type ActionType =
    TypeRemoveTodolistAction
    | TypeAddTodolistAction
    | TypeChangeTodoolistAction
    | TypeChangeTodoolistFilterAction;

export function TodolistReducer(state: Array<ToDoListsType> = initialState, action: ActionType): Array<ToDoListsType> {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newToDolist: ToDoListsType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }
            return [
                ...state, newToDolist
            ]
        case "CHANGE_TODOLIST_TITLE":
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                }
                return tl

            })
        case "CHANGE_TODOLIST_FILTER":
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                }
                return tl

            })

        default:
            return state
    }


}