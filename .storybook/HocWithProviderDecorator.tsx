import React from 'react';
import {Provider} from "react-redux";
import {AppRootStateType, store} from "../src/state/store";
import {combineReducers, createStore} from "redux";
import {taskReducer} from "../src/state/taskReducer";
import {TodolistReducer} from "../src/state/todolistReducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: TodolistReducer
})
const initialGlobalState = {
    todolists:[
        {id:'todolist1',title:'What to Learn',filter:'all'},
        {id:'todolist2',title:'What to Buy',filter:'all'}
    ],
    tasks:{
        ['todolist1']:[
            {id:v1(),title:'HTML',isDone: true},
            {id:v1(),title:'CSS',isDone: false}
        ],
        ['todolist2']:[
            {id:v1(),title:'Milk',isDone: true},
            {id:v1(),title:'Butter',isDone: false}
        ]
    }
}

export const storyBookStore  = createStore(rootReducer,initialGlobalState as AppRootStateType);

export const HocWithProviderDecorator = (story:any)=>{
    return<Provider store={storyBookStore}> {story()}</Provider>
}