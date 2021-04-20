import {getIsAuth} from "../dall/todolists-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setIsAuthAC} from "../state/loginReducer";

const initialState: TypeInitialSate = {
    status: "free",
    error: null,
    isInitial: false
}

export const isInitialTC = createAsyncThunk('app/IsInitial', async (arg, thunkAPI) => {
    try {
        thunkAPI.dispatch(setStatusAC({status: 'loading'}))
        let result = await getIsAuth.getInitialApp()
        if (result.resultCode === 0) {
            thunkAPI.dispatch(setStatusAC({status: 'succeeded'}))
            thunkAPI.dispatch(setIsAuthAC({isAuth: true}))
        } else {
            thunkAPI.dispatch(setStatusAC({status: 'error'}))
            thunkAPI.dispatch(setErrorAC({error: result.messages[0]}))
        }
        // thunkAPI.dispatch(setIsInitialAC({isInitial:true}))
        return {isInitial: true}
    } catch (e) {
        thunkAPI.dispatch(setStatusAC({status: 'error'}))
        thunkAPI.dispatch(setErrorAC(e.toString()))
        return {isInitial: true}

    }
})
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
    },
    extraReducers: (builder) => {
        builder.addCase(isInitialTC.fulfilled, (state, action) => {
            state.isInitial = action.payload.isInitial

        })
    }

})

const AppReducer = slice.reducer;
export const {setStatusAC, setErrorAC} = slice.actions;


type TypeInitialSate = {
    status: TypeStatus
    error: string | null
    isInitial: boolean
}
export type TypeStatus = 'free' | 'loading' | 'error' | 'succeeded';
export default AppReducer;


