import {TypeFilter} from "../app/AppWithRedux";
import GetApi, {TypeTodolist} from "../dall/todolists-api";
import {setErrorAC, setStatusAC} from "../app/appReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

let initialState: Array<TypeTodolistReducer> = []
export const getTodolistsTC = createAsyncThunk('todolist/getTodolists',
    async (param,thunkAPI)=>{
     try{
         thunkAPI.dispatch(setStatusAC({status: 'loading'}))
         let todolists = await GetApi.getTodoLists()
         thunkAPI.dispatch(setStatusAC({status: 'succeeded'}))
         return {todolists}

     }catch (e) {
         thunkAPI.dispatch(setStatusAC({status: 'succeeded'}))
         return thunkAPI.rejectWithValue('Some error')

     }
})
export const addTodolistTC = createAsyncThunk('todolist/addTodolist',
    async (title: string,thunkAPI)=>{
        try {
            thunkAPI.dispatch(setStatusAC({status: 'loading'}))
            let result = await GetApi.setTodolist(title)
            if (result.data.resultCode === 0) {
                thunkAPI.dispatch(setStatusAC({status: 'succeeded'}))
                return  {todolist:result.data.data.item}
            } else {
                thunkAPI.dispatch(setStatusAC({status: 'error'}))
                return thunkAPI.rejectWithValue(result.data.messages[0])


            }
        } catch (e) {
            thunkAPI.dispatch(setStatusAC({status: 'error'}))
            thunkAPI.dispatch(setErrorAC(e.toString()))
            return  thunkAPI.rejectWithValue(e)
        }

    })
export const removeTodolistTC = createAsyncThunk('todolist/removeTodolist',
    async (todolistId: string,thunkAPI)=>{
        try {
            thunkAPI.dispatch(setStatusAC({status: 'loading'}))
            thunkAPI.dispatch(setStatusDisabled({todolistId,disabled:true}))
            let result = await GetApi.removeTodolist(todolistId)
            if (result.data.resultCode === 0) {
                thunkAPI.dispatch(setStatusAC({status:'succeeded'}))
                thunkAPI.dispatch(setStatusDisabled({todolistId,disabled:false}))
                return {todolistId}

            } else {
                thunkAPI.dispatch(setStatusAC({status:'error'}))
                thunkAPI.dispatch(setStatusDisabled({todolistId,disabled:false}))
                return thunkAPI.rejectWithValue(result.data.messages[0])

            }

        } catch (e) {
            thunkAPI.dispatch(setStatusAC({status:'error'}))
            return thunkAPI.rejectWithValue(e)

        }
    } )
export const updateTodolistTC = createAsyncThunk('todolist/updateTodolist',
    async (param:{todolistId: string, title: string},thunkAPI)=>{
        try {
            thunkAPI.dispatch(setStatusAC({status: 'loading'}))
            let result = await GetApi.updateTodolist(param.todolistId, param.title)
            if (result.data.resultCode === 0) {
                thunkAPI.dispatch(setStatusAC({status: 'succeeded'}))
              return {todolistId:param.todolistId,title:param.title}
            } else {
                thunkAPI.dispatch(setStatusAC({status: 'error'}))
                return thunkAPI.rejectWithValue(result.data.messages[0])
            }
        } catch (e) {
            thunkAPI.dispatch(setStatusAC({status: 'error'}))
            thunkAPI.dispatch(setErrorAC(e.toString()))
            return thunkAPI.rejectWithValue(e.toString())

        }
    })

const slice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: TypeFilter }>) {
            state.map(td => {
                if (td.id === action.payload.id) {
                    td.filter = action.payload.filter
                }
                return td
            })
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
    },
    extraReducers:(builder)=>{
        builder.addCase(getTodolistsTC.fulfilled,(state, action)=>{
            return  state = action.payload.todolists.map(td => {
                return {
                    ...td,
                    filter:"all",
                    disabledStatus:false
                }

            });
        })
        builder.addCase(addTodolistTC.fulfilled,(state, action)=>{
            let newTodolist: any = action.payload.todolist;
            newTodolist.filter = 'all';
            state.unshift(newTodolist)

        })
        builder.addCase(removeTodolistTC.fulfilled,(state, action)=>{
            let todolist = state.findIndex(tl => tl.id === action.payload.todolistId)
            state.splice(todolist, 1)

        })
        builder.addCase(updateTodolistTC.fulfilled,(state, action)=>{
            state.map((td )=> {
                if (td.id === action.payload.todolistId) {
                    td.title = action.payload.title
                }
                return td
            })

        })


    }
})

export const {
    changeTodolistFilterAC,
    setStatusDisabled
} = slice.actions;


export const TodolistReducer = slice.reducer;







export type TypeTodolistReducer = TypeTodolist & { filter: TypeFilter, disabledStatus: boolean }
