import {taskReducer} from './taskReducer';
import {TodolistReducer} from './todolistReducer';
import {combineReducers} from 'redux';
import thunk from "redux-thunk";
import AppReducer from "../app/appReducer";
import LoginReducer from "./loginReducer";
import {configureStore} from "@reduxjs/toolkit";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: TodolistReducer,
    app:AppReducer,
    login:LoginReducer
})
// непосредственно создаём store
// export const store = createStore(rootReducer,applyMiddleware(thunk));
export const store = configureStore({
    reducer:rootReducer,
    middleware:getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)

})
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;