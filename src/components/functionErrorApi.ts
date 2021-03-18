import {setErrorAC, setStatusAC} from "../app/appReducer";
import {RemoveTodolistAC, setStatsuDesabled} from "../state/todolistReducer";
import {Dispatch} from "redux";

export const functionErrorApi =
    (data:any,todolistId:string, dispatch:Dispatch)=>{
        if (data.resultCode === 0) {
            dispatch(RemoveTodolistAC(todolistId))
            dispatch(setStatusAC('successed'))
            dispatch(setStatsuDesabled(todolistId,false))
        } else {
            dispatch(setStatusAC('error'))
            dispatch(setStatsuDesabled(todolistId,false))
            throw  new Error(data.messages[0])

        }

}

export const functionErrorNetwork=(e:any,dispatch:Dispatch,todolistId:string)=>{
    dispatch(setErrorAC(e.toString()))
    dispatch(setStatsuDesabled(todolistId,false))
    dispatch(setStatusAC('error'))


}