import {TypeFilter} from "../AppWithRedux";
import GetApi, {TypeTodolist} from "../dall/todolists-api";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "./store";

export const RemoveTodolistAC = (todolistId: string): TypeRemoveTodolistAction => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodilistAC = (todolist:TypeTodolist): TypeAddTodolistAction => {
    return {type: 'ADD-TODOLIST', todolist}
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
export const setTodolist = (todolists:Array<TypeTodolist>)=>{
    return{
        type:'todolist_reducer/SET_TODOLISTS',
        todolists
    } as const
}
export type TypeSetTodolistAction = ReturnType<typeof setTodolist>
export type TypeRemoveTodolistAction = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type TypeAddTodolistAction = {
    type: 'ADD-TODOLIST'
    todolist:TypeTodolist
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
    | TypeChangeTodoolistFilterAction
    | TypeSetTodolistAction;

export function TodolistReducer(state: Array<TypeTodolistReducer> = initialState, action: ActionType): Array<TypeTodolistReducer> {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':

            const newTodolist:any  = action.todolist
            newTodolist.filter = 'all'
            return [
                newTodolist, ...state
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
        case "todolist_reducer/SET_TODOLISTS":{
            return action.todolists.map(td=> {
               return{
                   ...td,
                   filter:"all"
               }
            })

        }
        default:
            return state
    }


}

export const getTodolistsTC = ():ThunkAction<void, AppRootStateType, unknown, ActionType>=>
    async (dispatch)=>{
        let result = await  GetApi.getTodoLists()
        dispatch(setTodolist(result))
}
export const addTodolistTC = (title: string):ThunkAction<void, AppRootStateType, unknown, ActionType>=>
    async (dispatch)=>{
        let result= await  GetApi.setTodolist(title)
        dispatch(AddTodilistAC(result.data.data.item))
    }
export const removeTodolistTC = (todolistId: string):ThunkAction<void, AppRootStateType, unknown, ActionType>=>
    async (dispatch)=>{
        await  GetApi.removeTodolist(todolistId)
        dispatch(RemoveTodolistAC(todolistId))
    }
export const updateTodolistTC = (todolistId: string,title:string):ThunkAction<void, AppRootStateType, unknown, ActionType>=>
    async (dispatch)=>{
       await  GetApi.updateTodolist(todolistId,title)
        dispatch(ChangeToddolistAC(todolistId,title))
    }