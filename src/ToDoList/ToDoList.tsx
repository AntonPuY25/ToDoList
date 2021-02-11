import React, {ChangeEvent} from "react";
import {FilterTypes} from "../AppWithRedux";
import AddItemForm from "../AddItemForm";
import EditSpan from "../editSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import s from './todolist.module.css'
import {useDispatch} from "react-redux";
import {ChangeToddolistAC, changeTodolistFilterAC, RemoveTodolistAC} from "../state/todolistReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/taskReducer";

type PropsType = {
    title: string
    tasks: Array<PropsTypeTask>
    filter: FilterTypes
    id: string

}

export type PropsTypeTask = {
    id: string
    title: string
    isDone: boolean

}

export function ToDoList(props: PropsType) {
    const dispatch = useDispatch()

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

            {props.tasks.map((i: PropsTypeTask) => {
                const removeTask = () => {
                    dispatch(removeTaskAC(i.id, props.id))

                }
                const changeTaskNew = (title: string) => {
                    dispatch(changeTaskTitleAC(i.id, title, props.id))
                }
                const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    dispatch(changeTaskStatusAC(i.id, e.currentTarget.checked, props.id))

                }
                return (<div key={i.id}>
                        <div><Checkbox color={"primary"}
                                       onChange={changeStatus}
                                       checked={i.isDone}/>
                            <EditSpan
                                title={i.title} isDone={i.isDone}
                                changeTaskTitle={changeTaskNew}/>
                            {/*<span className={(i.isDone === true) ? 'is-done' : ""}>{i.title}</span>*/}
                            <span><IconButton onClick={removeTask}><HighlightOffIcon/>
                        </IconButton></span>
                        </div>


                    </div>

                )
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