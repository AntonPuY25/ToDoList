import {TypeFilter} from "../app/AppWithRedux";
import GetApi, {TypeTodolist} from "../dall/todolists-api";
import {setErrorAC, setStatusAC} from "../app/appReducer";
import {functionErrorApi, functionErrorNetwork} from "../components/functionErrorApi";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

let initialState: Array<TypeTodolistReducer> = []

const slice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        RemoveTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            let todolist = state.findIndex(tl => tl.id === action.payload.todolistId)
            state.splice(todolist, 1)
        },
        AddTodolistAC(state, action: PayloadAction<{ todolist: TypeTodolist }>) {
            let newTodolist: any = action.payload.todolist;
            newTodolist.filter = 'all';
            state.unshift(newTodolist)


        },
        ChangeTodolistAC(state, action: PayloadAction<{ todolistId: string, title: string }>) {
             state.map((td )=> {
                   if (td.id === action.payload.todolistId) {
                      td.title = action.payload.title
                }
                   return td
            })
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: TypeFilter }>) {
            state.map(td => {
                if (td.id === action.payload.id) {
                    td.filter = action.payload.filter
                }
                return td
            })
        },
        setTodolist(state, action: PayloadAction<{ todolists: Array<TypeTodolist> }>) {

           return  state = action.payload.todolists.map(td => {
                return {
                    ...td,
                    filter:"all",
                    disabledStatus:false
                }

            });
        },

        setStatusDisabled(state, action: PayloadAction<{ todolistId: string, disabled: boolean }>) {
            state.map(td => {
                    if (td.id === action.payload.todolistId) {
                        td.disabledStatus = action.payload.disabled
                    }
                return td
                }
            )
        }
    }


})

export const {
    RemoveTodolistAC,
    AddTodolistAC,
    ChangeTodolistAC,
    changeTodolistFilterAC,
    setTodolist,
    setStatusDisabled
} = slice.actions;


export const TodolistReducer = slice.reducer;


export const getTodolistsTC = () =>
    async (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        let todolists = await GetApi.getTodoLists()
        dispatch(setTodolist({todolists}))
        dispatch(setStatusAC({status: 'succeeded'}))

    }
export const addTodolistTC = (title: string) =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(setStatusAC({status: 'loading'}))
            let result = await GetApi.setTodolist(title)
            if (result.data.resultCode === 0) {
                dispatch(AddTodolistAC({todolist:result.data.data.item}))
                dispatch(setStatusAC({status: 'succeeded'}))

            } else {
                dispatch(setStatusAC({status: 'error'}))
                throw new Error(result.data.messages[0])


            }
        } catch (e) {
            dispatch(setStatusAC({status: 'error'}))
            dispatch(setErrorAC(e.toString()))
        }

    }
export const removeTodolistTC = (todolistId: string) =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(setStatusAC({status: 'loading'}))
            dispatch(setStatusDisabled({todolistId,disabled:true}))
            let result = await GetApi.removeTodolist(todolistId)
            functionErrorApi(result.data, todolistId, dispatch)
        } catch (e) {
            functionErrorNetwork(e, dispatch, todolistId)

        }

    }
export const updateTodolistTC = (todolistId: string, title: string) =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(setStatusAC({status: 'loading'}))
            let result = await GetApi.updateTodolist(todolistId, title)
            if (result.data.resultCode === 0) {
                dispatch(setStatusAC({status: 'succeeded'}))
                dispatch(ChangeTodolistAC({todolistId,title}))
            } else {
                dispatch(setStatusAC({status: 'error'}))
                throw new Error(result.data.messages[0])
            }
        } catch (e) {
            dispatch(setStatusAC({status: 'error'}))
            dispatch(setErrorAC(e.toString()))

        }
    }

export type TypeTodolistReducer = TypeTodolist & { filter: TypeFilter, disabledStatus: boolean }
