import GetApi, {PropertiesType, TypeStatusTask, TypeTaskItems} from "../dall/todolists-api";
import {AppRootStateType} from "./store";
import {setErrorAC, setStatusAC} from "../app/appReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistTC, getTodolistsTC, removeTodolistTC} from "./todolistReducer";

export type TypeTaskReducer = {
    [key: string]: TypeTaskItems[]
}
let initialState: TypeTaskReducer = {}
export const getTaskTC = createAsyncThunk('task/getTask', async (todoListId: string, thunkAPI) => {
    thunkAPI.dispatch(setStatusAC({status: 'loading'}))
    let result = await GetApi.getTasks(todoListId)
    try {
        if (!result.data.error) {
            thunkAPI.dispatch(setStatusAC({status: 'succeeded'}))
            return {todoListId, tasks: result.data.items}

        } else {
            return thunkAPI.rejectWithValue({error: 'Some Error'})

        }

    } catch (e) {
        thunkAPI.dispatch(setStatusAC({status: 'error'}))
        thunkAPI.dispatch(setErrorAC({error: 'Some Error'}))
        return thunkAPI.rejectWithValue({error: 'Some Error'})

    }
})
export const addTaskTC = createAsyncThunk('task/AddTask', async (param: { todoListId: string, title: string }, thunkAPI) => {
    try {
        thunkAPI.dispatch(setStatusAC({status: 'loading'}))
        let task = await GetApi.createTask(param.todoListId, param.title)
        if (task.data.resultCode === 0) {
            thunkAPI.dispatch(setStatusAC({status: 'succeeded'}))
            return {task: task.data.data.item}

        } else {
            thunkAPI.dispatch(setStatusAC({status: 'error'}))
            return thunkAPI.rejectWithValue(task.data.messages[0])

        }
    } catch (e) {
        thunkAPI.dispatch(setErrorAC(e.toString()))
        thunkAPI.dispatch(setStatusAC({status: 'error'}))
        return thunkAPI.rejectWithValue(e)

    }
})
export const removeTaskTC = createAsyncThunk('task/removeTask', async (param: { todoListId: string, taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(setStatusAC({status: 'loading'}))
    thunkAPI.dispatch(changeTaskDisabledAC({taskId: param.taskId, todoListId: param.todoListId, disabled: true}))
    let result = await GetApi.deleteTask(param.todoListId, param.taskId)
    try {
        if (result.data.resultCode === 0) {
            thunkAPI.dispatch(setStatusAC({status: 'succeeded'}))
            thunkAPI.dispatch(changeTaskDisabledAC({
                taskId: param.taskId,
                todoListId: param.todoListId,
                disabled: false
            }))
            return {taskId: param.taskId, todoListId: param.todoListId}

        } else {
            thunkAPI.dispatch(setStatusAC({status: 'error'}))
            thunkAPI.dispatch(changeTaskDisabledAC({
                taskId: param.taskId,
                todoListId: param.todoListId,
                disabled: false
            }))
            return thunkAPI.rejectWithValue(result.data.messages[0])
        }

    } catch (e) {
        thunkAPI.dispatch(setErrorAC(e.toString()))
        thunkAPI.dispatch(setStatusAC({status: 'error'}))
        return thunkAPI.rejectWithValue(e)

    }
})

export const updateTaskTitleTC = createAsyncThunk('task/updateTaskTitle',
    async (param: { todoListId: string, taskId: string, title: string }, thunkAPI) => {
        const state = thunkAPI.getState() as AppRootStateType
        const tasks = state.tasks
        const task = tasks[param.todoListId].find(ts => ts.id === param.taskId)
        if (task) {

            const model: PropertiesType = {
                title: param.title,
                description: task.description,
                completed: task.completed,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,

            }
            try {
                thunkAPI.dispatch(setStatusAC({status: 'loading'}))
                let result = await GetApi.updateTask(task.todoListId, task.id, model)
                if (result.data.resultCode === 0) {
                    thunkAPI.dispatch(setStatusAC({status: 'succeeded'}))
                    return {task: result.data.data.item}

                } else {
                    thunkAPI.dispatch(setStatusAC({status: 'error'}))
                    return thunkAPI.rejectWithValue(result.data.messages[0])
                }
            } catch (e) {
                thunkAPI.dispatch(setErrorAC(e.toString()))
                thunkAPI.dispatch(setStatusAC({status: 'error'}))
                return thunkAPI.rejectWithValue(e)

            }
        }
        return thunkAPI.rejectWithValue("Some Error")

    })
export const updateTaskStatusTC = createAsyncThunk('task/updateTaskStatus',
    async (param: { todoListId: string, taskId: string, status: TypeStatusTask }, thunkAPI) => {
        const state = thunkAPI.getState() as AppRootStateType
        const tasks = state.tasks
        const task = tasks[param.todoListId].find(ts => ts.id === param.taskId)

        if (task) {
            const model: PropertiesType = {
                title: task.title,
                description: task.description,
                completed: task.completed,
                status: param.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
            }
            try {
                thunkAPI.dispatch(setStatusAC({status: 'loading'}))
                let result = await GetApi.updateTask(task.todoListId, task.id, model)
                if (result.data.resultCode === 0) {

                    thunkAPI.dispatch(setStatusAC({status: 'succeeded'}))
                    return {task: result.data.data.item}
                } else {
                    thunkAPI.dispatch(setStatusAC({status: 'error'}))
                    return thunkAPI.rejectWithValue(result.data.messages[0])
                }
            } catch (e) {
                thunkAPI.dispatch(setErrorAC(e.toString()))
                thunkAPI.dispatch(setStatusAC({status: 'error'}))
                return thunkAPI.rejectWithValue(e)

            }

        }
        return thunkAPI.rejectWithValue('Some Error')

    })

const slice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        changeTaskDisabledAC(state, action: PayloadAction<{ taskId: string, todoListId: string, disabled: boolean }>) {
            state[action.payload.todoListId].map(task => {
                if (task.id === action.payload.taskId) {
                    task.disabledStatus = action.payload.disabled
                }
                return task;
            })
        },


    },
    extraReducers: (builder) => {
        builder
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = [];
            })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.todolistId]
        })

        builder.addCase(getTodolistsTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach(td => {
                state[td.id] = []

            })
        })

        builder.addCase(getTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId] = action.payload.tasks
        })
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.task.todoListId].push(action.payload.task)
        })
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            let task = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId)
            state[action.payload.todoListId].splice(task, 1)
        })
        builder.addCase(updateTaskTitleTC.fulfilled, (state, action) => {
            state[action.payload.task.todoListId].map(task => {
                if (task.id === action.payload.task.id) {
                    task.title = action.payload.task.title
                    task.status = action.payload.task.status
                }
                return task;
            })
        })
        builder.addCase(updateTaskStatusTC.fulfilled, (state, action) => {
            state[action.payload.task.todoListId].map(task => {
                if (task.id === action.payload.task.id) {
                    task.title = action.payload.task.title
                    task.status = action.payload.task.status
                }
                return task;
            })
        })


    }
})


export const taskReducer = slice.reducer;
export const {changeTaskDisabledAC} = slice.actions;


export type TypeTaskDisabledButton = ReturnType<typeof changeTaskDisabledAC>
export type ActionType =TypeTaskDisabledButton


//
// export function taskReducer(state: TypeTaskReducer = initialState, action: ActionType): TypeTaskReducer {
//     switch (action.type) {
//         case 'REMOVE-TASK': {
//             return {
//                 ...state,
//                 [action.todoListId]: [...state[action.todoListId].filter((task: TypeTaskItems) => task.id !== action.taskId)]
//             }
//         }
//
//         case 'ADD-TASK': {
//             return {
//                 ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
//             }
//
//         }
//
//         case "CHANGE_TASK": {
//             const copyState = {...state}
//             let result = copyState[action.task.todoListId].map(ts => {
//                 if (ts.id === action.task.id) {
//                     ts = action.task
//                     return ts
//                 }
//                 return ts
//             })
//             return {
//                 ...state,
//                 [action.task.todoListId]: result
//             }
//         }
//         case "CHANGE_DISABLED":{
//             const copyState = {...state}
//             let result = copyState[action.todoListId].map(ts => {
//                 if (ts.id === action.taskId) {
//                     ts.disabledStatus = action.disabled
//                     return ts
//                 }
//                 return ts
//             })
//             return {
//                 ...state,
//                 [action.todoListId]: result
//             }
//         }
//
//
//         case 'ADD-TODOLIST': {
//             return {
//                 ...state,
//                 [action.todolist.id]: []
//             }
//         }
//
//         case 'REMOVE-TODOLIST': {
//             return {
//                 delete: state[action.id],
//                 ...state
//
//             }
//         }
//
//
//         case "todolist_reducer/SET_TODOLISTS": {
//             let copyState = {...state}
//             action.todolists.forEach(td => {
//                 copyState[td.id] = []
//             })
//             return copyState;
//         }
//         case "GET-TASKS": {
//             return {
//                 ...state,
//                 [action.todoListId]: action.tasks.map(task => task)
//             }
//         }
//
//         default:
//             return state
//     }
// }
