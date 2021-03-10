import {v1} from "uuid";
import {TypeFilter} from "../AppWithRedux";
import {TypeTodolist} from "../dall/todolists-api";

export const RemoveTodolistAC = (todolistId: string): TypeRemoveTodolistAction => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodilistAC = (title: string): TypeAddTodolistAction => {
    return {type: 'ADD-TODOLIST', title, todoListId: v1()}
}


export const ChangeToddolistAC = (id: string, title: string): TypeChangeTodoolistAction => {
    return {
        type: "CHANGE_TODOLIST_TITLE",
        id,
        title
    }
}
export const changeTodolistFilterAC = (id: string, filter: TypeFilter): TypeChangeTodoolistFilterAction => {
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
    todoListId: string
}
type TypeChangeTodoolistAction = {
    type: "CHANGE_TODOLIST_TITLE"
    id: string
    title: string
}
type TypeChangeTodoolistFilterAction = {
    type: "CHANGE_TODOLIST_FILTER"
    id: string
    filter: TypeFilter
}
export type TypeTodolistReducer = TypeTodolist&{filter:TypeFilter}
let initialState: Array<TypeTodolistReducer> = []
export type ActionType =
    TypeRemoveTodolistAction
    | TypeAddTodolistAction
    | TypeChangeTodoolistAction
    | TypeChangeTodoolistFilterAction;

export function TodolistReducer(state: Array<TypeTodolistReducer> = initialState, action: ActionType): Array<TypeTodolistReducer> {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':

            const newToDolist:TypeTodolistReducer  = {
                id: action.todoListId,
                title: action.title,
                addedDate: "",
                order: 1,
                filter:'all',
            }
            return [
                ...state, newToDolist
            ]
        case "CHANGE_TODOLIST_TITLE":
            return state.map((tl) => {
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