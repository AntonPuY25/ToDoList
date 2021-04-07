import GetApi, {PropertiesType, TypeStatusTask, TypeTaskItems} from "../dall/todolists-api";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "./store";
import {setErrorAC, setStatusAC} from "../app/appReducer";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AddTodolistAC, RemoveTodolistAC,setTodolist} from "./todolistReducer";

export type TypeTaskReducer = {
    [key: string]: TypeTaskItems[]
}
let initialState: TypeTaskReducer = {
}
const slice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todoListId: string }>) {
            let task = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId)
            state[action.payload.todoListId].splice(task, 1)
        },
        addTaskAC(state, action: PayloadAction<{ task: TypeTaskItems }>) {
            state[action.payload.task.todoListId].push(action.payload.task)
        },
        changeTaskAC(state, action: PayloadAction<{ task: TypeTaskItems }>) {
            state[action.payload.task.todoListId].map(task => {
                if (task.id === action.payload.task.id) {
                    task.title = action.payload.task.title
                    task.status = action.payload.task.status
                }
                return task;
            })
        },
        changeTaskDisabledAC(state, action: PayloadAction<{ taskId: string, todoListId: string, disabled: boolean }>) {
            state[action.payload.todoListId].map(task => {
                if (task.id === action.payload.taskId) {
                    task.disabledStatus = action.payload.disabled
                }
                return task;
            })
        },
        getTasksAC(state, action: PayloadAction<{ todoListId: string, tasks: Array<TypeTaskItems> }>) {

            state[action.payload.todoListId] = action.payload.tasks

        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(AddTodolistAC, (state, action) => {
                state[action.payload.todolist.id] = [];
            })
        builder.addCase(RemoveTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        })

        builder.addCase(setTodolist, (state, action) => {
            action.payload.todolists.forEach(td => {
                state[td.id]=[]

            })


        })
    }})


export const taskReducer = slice.reducer;
export const {removeTaskAC, addTaskAC, changeTaskAC, changeTaskDisabledAC, getTasksAC} = slice.actions;


export const getTaskTC = (todoListId: string) =>

    async (dispatch: Dispatch) => {
        debugger
        dispatch(setStatusAC({status: 'loading'}))
        let result = await GetApi.getTasks(todoListId)
        try {
            if (!result.data.error) {
                dispatch(getTasksAC({todoListId, tasks: result.data.items}))
                debugger
                dispatch(setStatusAC({status: 'succeeded'}))
            } else {
                debugger
                throw new Error("Some Error")
            }

        } catch (e) {
            debugger
            dispatch(setStatusAC({status: 'error'}))
            dispatch(setErrorAC(e))

        }


    }


export const addTaskTC = (todoListId: string, title: string): ThunkAction<void,
    AppRootStateType, unknown, ActionType> =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(setStatusAC({status: 'loading'}))
            let task = await GetApi.createTask(todoListId, title)
            if (task.data.resultCode === 0) {
                dispatch(addTaskAC({task: task.data.data.item}))
                dispatch(setStatusAC({status: 'succeeded'}))
            } else {
                dispatch(setStatusAC({status: 'error'}))
                throw new Error(task.data.messages[0])

            }
        } catch (e) {
            dispatch(setErrorAC(e.toString()))
            dispatch(setStatusAC({status: 'error'}))

        }


    }

export const removeTaskTC = (todoListId: string, taskId: string): ThunkAction<void, AppRootStateType,
    unknown, ActionType> =>
    (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        dispatch(changeTaskDisabledAC({taskId, todoListId, disabled: true}))
        GetApi.deleteTask(todoListId, taskId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC({taskId, todoListId}))
                    dispatch(setStatusAC({status: 'succeeded'}))
                    dispatch(changeTaskDisabledAC({taskId, todoListId, disabled: false}))

                } else {
                    dispatch(setStatusAC({status: 'error'}))
                    dispatch(changeTaskDisabledAC({taskId, todoListId, disabled: false}))
                    throw new Error(res.data.messages[0])
                }
            })
            .catch(e => {
                dispatch(setErrorAC(e.toString()))
                dispatch(setStatusAC({status: 'error'}))

            })
    }

export const updateTaskTitleTC = (todoListId: string, taskId: string, title: string):
    ThunkAction<void,
        AppRootStateType, unknown, ActionType> =>

    async (dispatch: Dispatch, getState) => {
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
            try {
                dispatch(setStatusAC({status: 'loading'}))
                let result = await GetApi.updateTask(task.todoListId, task.id, model)
                if (result.data.resultCode === 0) {
                    dispatch(changeTaskAC({task: result.data.data.item}))
                    dispatch(setStatusAC({status: 'succeeded'}))
                } else {
                    dispatch(setStatusAC({status: 'error'}))
                    throw new Error(result.data.messages[0])
                }
            } catch (e) {
                dispatch(setErrorAC(e.toString()))
                dispatch(setStatusAC({status: 'error'}))

            }
        }

    }
export const updateTaskStatusTC =
    (todoListId: string, taskId: string, status: TypeStatusTask):
        ThunkAction<void, AppRootStateType, unknown, ActionType> =>
        async (dispatch: Dispatch, getState) => {
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
                try {
                    dispatch(setStatusAC({status: 'loading'}))
                    let result = await GetApi.updateTask(task.todoListId, task.id, model)
                    if (result.data.resultCode === 0) {
                        dispatch(changeTaskAC({task: result.data.data.item}))
                        dispatch(setStatusAC({status: 'succeeded'}))
                    } else {
                        dispatch(setStatusAC({status: 'error'}))
                        throw new Error(result.data.messages[0])
                    }
                } catch (e) {
                    dispatch(setErrorAC(e.toString()))
                    dispatch(setStatusAC({status: 'error'}))

                }

            }
        }


export type TypeTaskDisabledButton = ReturnType<typeof changeTaskDisabledAC>
export type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskAC>
    | ReturnType<typeof getTasksAC>
    | TypeTaskDisabledButton


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
