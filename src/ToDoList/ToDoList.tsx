import React from "react";
import {FilterTypes, TypeTaskState} from "../AppWithRedux";
import AddItemForm from "../AddItemForm";
import EditSpan from "../editSpan";
import {Button, IconButton} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import s from './todolist.module.css'
import {useDispatch, useSelector} from "react-redux";
import {ChangeToddolistAC, changeTodolistFilterAC, RemoveTodolistAC} from "../state/todolistReducer";
import {addTaskAC} from "../state/taskReducer";
import {AppRootStateType} from "../state/store";
import Task from "../Tasks/tasks";

type PropsType = {
    title: string
    filter: FilterTypes
    id: string

}

export type PropsTypeTask = {
    id: string
    title: string
    isDone: boolean

}

export function ToDoList(props: PropsType) {
    const tasks = useSelector<AppRootStateType, TypeTaskState>(state => state.tasks)
    const dispatch = useDispatch()
    let resultTask = tasks[props.id];

    if (props.filter === "active") {
        resultTask = tasks[props.id].filter(t => t.isDone === false)
    }

    if (props.filter === "completed") {
        resultTask = tasks[props.id].filter(t => t.isDone === true)
    }

    const onAllKeyHandler = () => {
        dispatch(changeTodolistFilterAC(props.id, 'all'))
    }
    const onActiveKeyHandler = () => {
        dispatch(changeTodolistFilterAC(props.id, 'active'))

    }
    const onCompletedKeyHandler = () => {
        dispatch(changeTodolistFilterAC(props.id, 'completed'))

    }
    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.id))
    }
    const changeTodotitle = (title: string) => {
        dispatch(ChangeToddolistAC(props.id, title))
    }
    return (<div>
        <div>
            <div className={s.delete}><IconButton
                onClick={() => dispatch(RemoveTodolistAC(props.id))}><DeleteForeverIcon/></IconButton></div>

            <h3 className={s.test} style={{textAlign: 'center'}}>
                <EditSpan
                    title={props.title}
                    changeTaskTitle={changeTodotitle}/>
            </h3>

            <AddItemForm addItems={addTask}/>
            {resultTask.map((i: PropsTypeTask) => {
              return  <Task taskId={i.id} todolistId={props.id} taskIsDone={i.isDone}
                            taskTitle={i.title}/>
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
}