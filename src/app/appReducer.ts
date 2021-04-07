import {Dispatch} from "redux";
import {getIsAuth} from "../dall/todolists-api";
import {setIsAuthAC} from "../state/loginReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TypeInitialSate = {
    status: "free",
    error: null,
    isInitial: false


}
const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setStatusAC(state, action: PayloadAction<{ status: TypeStatus }>) {
            state.status = action.payload.status
        },
        setErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setIsInitialAC(state, action: PayloadAction<{ isInitial: boolean }>) {
            state.isInitial = action.payload.isInitial

        },
    }

})

const AppReducer = slice.reducer;
export const {setStatusAC,setErrorAC,setIsInitialAC} = slice.actions;
export const isInitialTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAC({status:'loading'}))
        let result = await getIsAuth.getInitialApp()
        if (result.resultCode === 0) {
            dispatch(setStatusAC({status:'succeeded'}))
            dispatch(setIsAuthAC({isAuth: true}))
        } else {
            dispatch(setStatusAC({status:'error'}))
            dispatch(setErrorAC({error:result.messages[0]}))
        }
        dispatch(setIsInitialAC({isInitial:true}))
    } catch (e) {
        dispatch(setStatusAC({status:'error'}))
        dispatch(setErrorAC(e.toString()))
        dispatch(setIsInitialAC({isInitial:true}))

    }
}

type TypeInitialSate = {
    status: TypeStatus
    error: string | null
    isInitial: boolean
}
export type TypeStatus = 'free' | 'loading' | 'error' | 'succeeded';
export default AppReducer;


