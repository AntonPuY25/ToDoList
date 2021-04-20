import React from 'react';
import {Provider} from "react-redux";
import {combineReducers} from "redux";
import {taskReducer} from "../src/state/taskReducer";
import {TodolistReducer} from "../src/state/todolistReducer";
import {v1} from "uuid";
import {PriorityType, TypeStatusTask} from "../src/dall/todolists-api";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: TodolistReducer
})
const initialGlobalState = {
    todolists:[
        { id: 'todolist1',
            title: 'Todolist1',
            addedDate: "",
            order: 1,
            filter:'all',},
        { id: 'todolist2',
            title: 'Todolist2',
            addedDate: "",
            order: 2,
            filter:'all',},
    ],
    tasks:{
        ['todolist1']:[
            { description: "",
                title: "Task1" ,
                completed: true,
                status: TypeStatusTask.Completed,
                priority: PriorityType.Hi,
                startDate: "",
                deadline: "",
                id: v1(),
                todoListId: 'todolist1',
                order: 1,
                addedDate:"",},

            { description: "",
                title: "Task2" ,
                completed: true,
                status: TypeStatusTask.New,
                priority: PriorityType.Hi,
                startDate: "",
                deadline: "",
                id: v1(),
                todoListId: 'todolist1',
                order: 2,
                addedDate:"",}
        ],
        ['todolist2']:[
            { description: "",
                title: "Task1" ,
                completed: true,
                status: TypeStatusTask.Completed,
                priority: PriorityType.Hi,
                startDate: "",
                deadline: "",
                id: v1(),
                todoListId: 'todolist2',
                order: 1,
                addedDate:"",},

            { description: "",
                title: "Task2" ,
                completed: true,
                status: TypeStatusTask.New,
                priority: PriorityType.Hi,
                startDate: "",
                deadline: "",
                id: v1(),
                todoListId: 'todolist2',
                order: 2,
                addedDate:"",}
        ],
    }
}

// export const storyBookStore  = createStore(rootReducer,initialGlobalState as AppRootStateType);
export const storyBookStore = configureStore({
    reducer:rootReducer,


})
export const HocWithProviderDecorator = (story:any)=>{
    return<Provider store={storyBookStore}> {story()}</Provider>
}