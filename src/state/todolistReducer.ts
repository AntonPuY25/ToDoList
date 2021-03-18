import {TypeFilter} from "../app/AppWithRedux";
import GetApi, {TypeTodolist} from "../dall/todolists-api";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "./store";
import {setErrorAC, setStatusAC, TypeSetErrorAction, TypeSetStatusAction} from "../app/appReducer";
import {functionErrorApi, functionErrorNetwork} from "../components/functionErrorApi";

export const RemoveTodolistAC = (todolistId: string): TypeRemoveTodolistAction => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodilistAC = (todolist: TypeTodolist): TypeAddTodolistAction => {
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
export const setTodolist = (todolists: Array<TypeTodolist>) => {
    return {
        type: 'todolist_reducer/SET_TODOLISTS',
        todolists
    } as const
}
export const setStatsuDesabled = (todolistId: string,disabled:boolean)=>
    ({type: "/todolistReducer/SET_DISABLED_STATUS",todolistId,disabled} as const)

let initialState: Array<TypeTodolistReducer> = []


export function TodolistReducer(state: Array<TypeTodolistReducer> = initialState, action: ActionType): Array<TypeTodolistReducer> {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':

            const newTodolist: any = action.todolist
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
        case "todolist_reducer/SET_TODOLISTS": {
            return action.todolists.map(td => {
                return {
                    ...td,
                    filter: "all",
                    disabledStatus:false
                }
            })

        }
        case "/todolistReducer/SET_DISABLED_STATUS":
            return state.map((td)=>{
                if(td.id===action.todolistId){
                    return {...td,disabledStatus:action.disabled}
                }
                return  td
            })
        default:
            return state
    }


}

export const getTodolistsTC = (): ThunkAction<void, AppRootStateType, unknown, ActionType | TypeSetStatusAction> =>
    async (dispatch) => {
        dispatch(setStatusAC("loading"))
        let result = await GetApi.getTodoLists()
        dispatch(setTodolist(result))
        dispatch(setStatusAC("successed"))

    }
export const addTodolistTC = (title: string): ThunkAction<void, AppRootStateType, unknown,
    ActionType | TypeSetErrorAction> =>
    async (dispatch) => {
        try {
            let result = await GetApi.setTodolist(title)
            if (result.data.resultCode === 0) {
                dispatch(AddTodilistAC(result.data.data.item))

            } else {
                throw new Error(result.data.messages[0])
            }
        } catch (e) {
            dispatch(setErrorAC(e.toString()))
        }

    }
export const removeTodolistTC = (todolistId: string): ThunkAction<void, AppRootStateType,
    unknown, ActionType | TypeSetErrorAction | TypeSetStatusAction> =>
    async (dispatch) => {
        try {
            dispatch(setStatusAC('loading'))
            dispatch(setStatsuDesabled(todolistId,true))
            let result = await GetApi.removeTodolist(todolistId)
            functionErrorApi(result.data,todolistId,dispatch)
        } catch (e) {
            functionErrorNetwork(e,dispatch,todolistId)

        }

    }
export const updateTodolistTC = (todolistId: string, title: string): ThunkAction<void, AppRootStateType, unknown, ActionType> =>
    async (dispatch) => {
        await GetApi.updateTodolist(todolistId, title)
        dispatch(ChangeToddolistAC(todolistId, title))
    }

export type TypeSetTodolistAction = ReturnType<typeof setTodolist>
export type TypeRemoveTodolistAction = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type TypeAddTodolistAction = {
    type: 'ADD-TODOLIST'
    todolist: TypeTodolist
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
export type TypeTodolistReducer = TypeTodolist & { filter: TypeFilter,disabledStatus:boolean }
export type TypeSetDisabledStatusAC = ReturnType<typeof setStatsuDesabled>
export type ActionType =
    TypeRemoveTodolistAction
    | TypeAddTodolistAction
    | TypeChangeTodoolistAction
    | TypeChangeTodoolistFilterAction
    | TypeSetTodolistAction
    |TypeSetDisabledStatusAC