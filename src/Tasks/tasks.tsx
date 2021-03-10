import React, {ChangeEvent, useCallback} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/taskReducer";
import {Checkbox, IconButton} from "@material-ui/core";
import EditSpan from "../editSpan";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {useDispatch} from "react-redux";
import { TypeTaskItems} from "../dall/todolists-api";

export type TypePropsTask = {
    task:TypeTaskItems
    todolistId: string

}
const Task =  React.memo((props:TypePropsTask)=>{
    const dispatch = useDispatch()

    const removeTask = useCallback( () => {
        dispatch(removeTaskAC(props.task.id, props.todolistId))

    },[dispatch,props.task.id,props.todolistId])
    const changeTaskNew = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(props.task.id, title, props.todolistId))
    },[dispatch,props.task.id,props.todolistId])
    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {

        dispatch(changeTaskStatusAC(props.task.id,

            e.currentTarget.checked?2:0, props.todolistId))

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

                <span><IconButton onClick={removeTask}><HighlightOffIcon/>
                        </IconButton></span>
            </div>




    </>

})
export default Task;