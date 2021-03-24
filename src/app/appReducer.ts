import {Dispatch} from "redux";
import {getIsAuth} from "../dall/todolists-api";
import {setIsAuthAC, TypeGetIsAuth} from "../state/login";

const initialState:TypeInitialSate = {
    status:"free",
    error:null,
    isInitial:false


}

const AppReducer=(state:TypeInitialSate=initialState,action:TypeActions):TypeInitialSate=>{

        switch(action.type){
            case "appReducer/SET_ERROR":{
                return{
                    ...state,
                    error:action.error
                }
            }
            case "appReducer/SET_STATUS":{
                return{
                    ...state,
                    status:action.status
                }
            }
            case "appReducer/SET_IS_INITIAL":{
                return {
                    ...state,
                    isInitial:action.isInitial
                }
            }

            default:return state

        }

}


export const setStatusAC = (status:TypeStatus)=>({type:'appReducer/SET_STATUS',status} as const)
export const setErrorAC = (error:string|null)=>({type:'appReducer/SET_ERROR',error} as const)
export const setIsInitialAC = (isInitial:boolean)=>({type:'appReducer/SET_IS_INITIAL',isInitial} as const)

export const isInitialTC = ()=> async (dispatch:Dispatch<TypeActions|TypeGetIsAuth>)=>{
            try{
                dispatch(setStatusAC('loading'))
                let result = await getIsAuth.getInitialApp()
                if(result.resultCode===0){
                    dispatch(setStatusAC('succeeded'))
                    dispatch(setIsAuthAC(true))
                }else{
                    dispatch(setStatusAC('error'))
                    dispatch(setErrorAC(result.messages[0]))
                }
                dispatch(setIsInitialAC(true))
            }catch (e) {
                dispatch(setStatusAC('error'))
                dispatch(setErrorAC(e.toString()))
                dispatch(setIsInitialAC(true))

            }
}

export type TypeSetStatusAction = ReturnType<typeof setStatusAC>
export type TypeSetErrorAction = ReturnType<typeof setErrorAC>
type TypeActions =
    |TypeSetErrorAction
    |TypeSetStatusAction
    |ReturnType<typeof setIsInitialAC>
type TypeInitialSate = {
    status:TypeStatus
    error:string|null
    isInitial:boolean
}
export type TypeStatus = 'free'|'loading'|'error'|'succeeded';
export default AppReducer;


