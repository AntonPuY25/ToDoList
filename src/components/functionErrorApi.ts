import {setErrorAC, setStatusAC} from "../app/appReducer";
import {Dispatch} from "redux";
import {RemoveTodolistAC,setStatusDisabled} from "../state/todolistReducer";

export const functionErrorApi =
    (data:any,todolistId:string, dispatch:Dispatch)=>{
        if (data.resultCode === 0) {
            dispatch(RemoveTodolistAC({todolistId}))
            dispatch(setStatusAC({status:'succeeded'}))
            dispatch(setStatusDisabled({todolistId,disabled:false}))
        } else {
            dispatch(setStatusAC({status:'error'}))
            dispatch(setStatusDisabled({todolistId,disabled:false}))
            throw  new Error(data.messages[0])

        }

}

export const functionErrorNetwork=(e:any,dispatch:Dispatch,todolistId:string)=>{
    dispatch(setErrorAC(e.toString()))
    dispatch(setStatusDisabled({todolistId,disabled:false}))
    dispatch(setStatusAC({status:'error'}))


}