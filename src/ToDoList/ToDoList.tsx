import React, {useCallback, useEffect} from "react";
import AddItemForm from "../components/AddItemForm";
import EditSpan from "../components/editSpan";
import {Button, IconButton} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import s from './todolist.module.css'
import {useDispatch, useSelector} from "react-redux";
import {
    changeTodolistFilterAC,
    removeTodolistTC,
    TypeTodolistReducer,
    updateTodolistTC
} from "../state/todolistReducer";
import {addTaskTC, getTaskTC, TypeTaskReducer} from "../state/taskReducer";
import {AppRootStateType} from "../state/store";
import Task from "../Tasks/tasks";
import {TypeStatusTask, TypeTaskItems} from "../dall/todolists-api";

type PropsType = {
    todolist:TypeTodolistReducer
}

export const ToDoList:React.FC<PropsType> = React.memo( ({todolist}) => {
    const tasks = useSelector<AppRootStateType, TypeTaskReducer>(state => state.tasks)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getTaskTC(todolist.id))
    },[dispatch,todolist.id])
    let resultTask = tasks[todolist.id];

    if (todolist.filter === "active") {

        resultTask = tasks[todolist.id].filter((t:TypeTaskItems) => t.status === TypeStatusTask.New)
    }
    if (todolist.filter === "completed") {
        resultTask = tasks[todolist.id].filter(t => t.status === TypeStatusTask.Completed)
    }

    const onAllKeyHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(todolist.id, 'all'))
    },[dispatch,todolist.id])
    const onActiveKeyHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(todolist.id, 'active'))

    },[dispatch,todolist.id])
    const onCompletedKeyHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(todolist.id, 'completed'))

    },[dispatch,todolist.id])
    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(todolist.id,title))
    },[dispatch,todolist.id])
    const changeTodotitle = useCallback((title: string) => {
        dispatch(updateTodolistTC(todolist.id, title))
    },[dispatch,todolist.id])
    return (<div>
        <div>

            <div className={s.delete} ><IconButton
                disabled={todolist.disabledStatus}
                onClick={() => dispatch(removeTodolistTC(todolist.id))}><DeleteForeverIcon/></IconButton></div>

            <h3 className={s.test} style={{textAlign: 'center'}}>
                <EditSpan
                    title={todolist.title}
                    changeTaskTitle={changeTodotitle}
                />

            </h3>

            <AddItemForm addItems={addTask} disabledButton={todolist.disabledStatus}/>

            {resultTask.map((i: TypeTaskItems) => {
              return  <Task todolistId={todolist.id} task={i}
                             key={i.id}  />
            })}


            <div>
                <Button size={"small"} color={"default"} variant={todolist.filter === 'all' ? 'outlined' : "text"}
                        onClick={onAllKeyHandler}>All
                </Button>
                <Button color={"primary"} size={"small"} variant={todolist.filter === 'active' ? 'outlined' : "text"}
                        onClick={onActiveKeyHandler}>Active
                </Button>
                <Button color={"secondary"} size={"small"} variant={todolist.filter === 'completed' ? 'outlined' : "text"}
                        onClick={onCompletedKeyHandler}>Completed
                </Button>
            </div>
        </div>
    </div>)
})