import React, {useCallback, useEffect} from "react";
import AddItemForm from "../components/AddItemForm";
import EditSpan from "../components/editSpan";
import {Button, IconButton} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import s from './todolist.module.css'
import {useDispatch, useSelector} from "react-redux";
import {changeTodolistFilterAC, removeTodolistTC, updateTodolistTC} from "../state/todolistReducer";
import {addTaskTC, getTaskTC, TypeTaskReducer} from "../state/taskReducer";
import {AppRootStateType} from "../state/store";
import Task from "../Tasks/tasks";
import {TypeStatusTask, TypeTaskItems} from "../dall/todolists-api";
import {TypeFilter} from "../app/AppWithRedux";

type PropsType = {
    title: string
    id: string
    filter:TypeFilter
}



export const ToDoList = React.memo( (props: PropsType) => {
    const tasks = useSelector<AppRootStateType, TypeTaskReducer>(state => state.tasks)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getTaskTC(props.id))
    },[dispatch,props.id])
    let resultTask = tasks[props.id];

    if (props.filter === "active") {

        resultTask = tasks[props.id].filter((t:TypeTaskItems) => t.status === TypeStatusTask.New)
    }
    if (props.filter === "completed") {
        resultTask = tasks[props.id].filter(t => t.status === TypeStatusTask.Completed)
    }

    const onAllKeyHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(props.id, 'all'))
    },[dispatch,props.id])
    const onActiveKeyHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(props.id, 'active'))

    },[dispatch,props.id])
    const onCompletedKeyHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(props.id, 'completed'))

    },[dispatch,props.id])
    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(props.id,title))
    },[dispatch,props.id])
    const changeTodotitle = useCallback((title: string) => {
        dispatch(updateTodolistTC(props.id, title))
    },[dispatch,props.id])
    return (<div>
        <div>
            <div className={s.delete}><IconButton
                onClick={() => dispatch(removeTodolistTC(props.id))}><DeleteForeverIcon/></IconButton></div>

            <h3 className={s.test} style={{textAlign: 'center'}}>
                <EditSpan
                    title={props.title}
                    changeTaskTitle={changeTodotitle}/>

            </h3>

            <AddItemForm addItems={addTask}/>

            {resultTask.map((i: TypeTaskItems) => {
              return  <Task todolistId={props.id} task={i}
                             key={i.id}  />
            })}


            <div>
                <Button size={"small"} color={"default"} variant={props.filter === 'all' ? 'outlined' : "text"}
                        onClick={onAllKeyHandler}>All
                </Button>
                <Button color={"primary"} size={"small"} variant={props.filter === 'active' ? 'outlined' : "text"}
                        onClick={onActiveKeyHandler}>Active
                </Button>
                <Button color={"secondary"} size={"small"} variant={props.filter === 'completed' ? 'outlined' : "text"}
                        onClick={onCompletedKeyHandler}>Completed
                </Button>
            </div>
        </div>
    </div>)
})