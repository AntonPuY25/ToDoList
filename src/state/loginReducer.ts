import {TypeFormikError} from "../login/login";
import {getIsAuth} from "../dall/todolists-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setErrorAC, setStatusAC} from "../app/appReducer";

const initialState = {
    isAuth: false
}
export const getIsAuthTC = createAsyncThunk<{isAuth: boolean},TypeFormikError,{
    rejectValue:{
        error:string
    }
}>('login/getIsAuth',async (values,thunkAPI)=>{
    try {
        thunkAPI.dispatch(setStatusAC({status:'loading'}))
        let result = await getIsAuth.login(values.email, values.password, values.rememberMe)
        if (result.resultCode === 0) {
            thunkAPI.dispatch(setStatusAC({status:'succeeded'}))
            return {isAuth: true}
        } else {
            thunkAPI.dispatch(setStatusAC({status:'error'}))
            thunkAPI.dispatch(setErrorAC({error:result.messages[0]}))
            return thunkAPI.rejectWithValue( {error: result.messages[0]})
        }
    } catch (e) {
        thunkAPI.dispatch(setStatusAC({status:'error'}))
        thunkAPI.dispatch(setErrorAC(e.toString()))
        return thunkAPI.rejectWithValue({error:e})


    }
})
export const logoutTC = createAsyncThunk('login/logout',async  (arg,thunkAPI)=>{
    try {
        thunkAPI.dispatch(setStatusAC({status:'loading'}))
        let result = await getIsAuth.logout()
        if (result.resultCode === 0) {
            thunkAPI.dispatch(setStatusAC({status:'succeeded'}))
            return {isAuth: false}
        } else {
            thunkAPI.dispatch(setStatusAC({status:'error'}))
            thunkAPI.dispatch(setErrorAC({error:result.messages[0]}))
            return thunkAPI.rejectWithValue( {error: result.messages[0]})

        }
    } catch (e) {
        thunkAPI.dispatch(setStatusAC({status:'error'}))
        thunkAPI.dispatch(setErrorAC(e.toString()))
        return thunkAPI.rejectWithValue({error:e})


    }
})




const slice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        setIsAuthAC:(state, action)=>{
            state.isAuth = action.payload.isAuth
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getIsAuthTC.fulfilled,(state,action)=>{
            state.isAuth = action.payload.isAuth
        })
        builder.addCase(logoutTC.fulfilled,(state,action)=>{
            state.isAuth = action.payload.isAuth

        })
}
})
const LoginReducer = slice.reducer;
export const {setIsAuthAC} = slice.actions




export default LoginReducer;