import React, {ChangeEvent, useCallback} from 'react';
import { removeTaskTC, updateTaskStatusTC, updateTaskTitleTC} from "../state/taskReducer";
import {Checkbox, IconButton} from "@material-ui/core";
import EditSpan from "../components/editSpan";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {useDispatch} from "react-redux";
import {TypeTaskItems} from "../dall/todolists-api";

export type TypePropsTask = {
    task:TypeTaskItems
    todolistId: string

}
const Task =  React.memo((props:TypePropsTask)=>{
    const dispatch = useDispatch()

    const removeTask = useCallback( () => {
        dispatch(removeTaskTC({todoListId:props.todolistId,taskId:props.task.id}))

    },[dispatch,props.task.id,props.todolistId])
    const changeTaskNew = useCallback((title: string) => {
        dispatch(updateTaskTitleTC({taskId:props.task.id,title,todoListId:props.todolistId}))
    },[dispatch,props.task.id,props.todolistId])
    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {

        dispatch(updateTaskStatusTC({taskId:props.task.id,status:e.currentTarget.checked?2:0,todoListId:props.todolistId} ))

    },[dispatch,props.task.id,props.todolistId])
    return <>


            <div><Checkbox color={"primary"}
                           onChange={changeStatus}
                           checked={props.task.status===0?false:true}/>
                <EditSpan
                    title={props.task.title}
                    changeTaskTitle={changeTaskNew}
                    status={props.task.status}
                />

                <span><IconButton onClick={removeTask} disabled={props.task.disabledStatus}><HighlightOffIcon/>
                        </IconButton></span>
            </div>




    </>

})
export default Task;