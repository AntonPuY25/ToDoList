import React, {ChangeEvent} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/taskReducer";
import {Checkbox, IconButton} from "@material-ui/core";
import EditSpan from "../editSpan";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {useDispatch} from "react-redux";
type TypePropsTask = {
    taskId:string
    todolistId: string
    taskIsDone:boolean
    taskTitle:string

}
const Task = (props:TypePropsTask)=>{
    const dispatch = useDispatch()
    const removeTask = () => {
        dispatch(removeTaskAC(props.taskId, props.todolistId))

    }
    const changeTaskNew = (title: string) => {
        dispatch(changeTaskTitleAC(props.taskId, title, props.todolistId))
    }
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.taskId, e.currentTarget.checked, props.todolistId))

    }
    return <>

       <div key={props.taskId}>
            <div><Checkbox color={"primary"}
                           onChange={changeStatus}
                           checked={props.taskIsDone}/>
                <EditSpan
                    title={props.taskTitle} isDone={props.taskIsDone}
                    changeTaskTitle={changeTaskNew}/>

                <span><IconButton onClick={removeTask}><HighlightOffIcon/>
                        </IconButton></span>
            </div>

        </div>


    </>

}
export default Task;