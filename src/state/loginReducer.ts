import {Dispatch} from "redux";
import {TypeFormikError} from "../login/login";
import {getIsAuth} from "../dall/todolists-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { setStatusAC, setErrorAC } from "../app/appReducer";

const initialState = {
    isAuth: false
}


const slice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        setIsAuthAC(state, action: PayloadAction<{ isAuth: boolean }>) {
            state.isAuth = action.payload.isAuth
        }
    }
})
const LoginReducer = slice.reducer;
export const {setIsAuthAC} = slice.actions;


export const getIsAuthTC = (values: TypeFormikError) => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAC({status:'loading'}))
        let result = await getIsAuth.login(values.email, values.password, values.rememberMe)
        if (result.resultCode === 0) {
            dispatch(setStatusAC({status:'succeeded'}))
            dispatch(setIsAuthAC({isAuth: true}))
        } else {
            dispatch(setStatusAC({status:'error'}))
            dispatch(setErrorAC({error:result.messages[0]}))
        }
    } catch (e) {
        dispatch(setStatusAC({status:'error'}))
        dispatch(setErrorAC(e.toString()))

    }

}
export const logoutTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAC({status:'loading'}))
        let result = await getIsAuth.logout()
        if (result.resultCode === 0) {
            dispatch(setStatusAC({status:'succeeded'}))
            dispatch(setIsAuthAC({isAuth: false}))
        } else {
            dispatch(setStatusAC({status:'error'}))
            dispatch(setErrorAC({error:result.messages[0]}))
        }
    } catch (e) {
        dispatch(setStatusAC({status:'error'}))
        dispatch(setErrorAC(e.toString()))

    }

}

export default LoginReducer;