import React, {ChangeEvent} from "react";
import {FilterTypes} from "../App";
import AddItemForm from "../AddItemForm";
import EditSpan from "../editSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import s from './todolist.module.css'
type PropsType = {
    title: string
    tasks: Array<PropsTypeTask>
    addTask: (title: string, toDoListId: string) => void
    delete: (id: string, toDoListId: string) => void
    changeFilter: (str: FilterTypes, toDoListID: string) => void
    changeStatus: (taskId: string, isDone: boolean, toDiListId: string) => void
    changeTaskTitle: (taskId: string, title: string, toDiListId: string) => void
    filter: FilterTypes
    id: string
    removeTodoList: (toDoListID: string) => void
    changeTodolistTitle: (title: string, toDiListId: string) => void

}
export type PropsTypeTask = {
    id: string
    title: string
    isDone: boolean

}

export function ToDoList(props: PropsType) {
    // let [error, setError] = useState<"Title is Required" | null>(null)
    // const [title, setTitle] = useState<string>("")
    // const addTask = () => {
    //     const taskTitle = title.trim()
    //     if (taskTitle) {
    //         props.addTask(taskTitle, props.id)
    //         setTitle('')
    //     } else {
    //         setError('Title is Required')
    //     }
    // }
    // const onChangeHandlerInput = (event: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(event.currentTarget.value)
    //     setError(null)
    // }
    // const onKeyHandlerInput = (event: KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === 'Enter') addTask()
    // }
    const onAllKeyHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveKeyHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedKeyHandler = () => {
        props.changeFilter('completed', props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodotitle = (title: string) => {
        props.changeTodolistTitle(title, props.id)
    }
    return (<div>
        <div>
            <h3 style={{textAlign:'center'}}><EditSpan title={props.title}
                          changeTaskTitle={changeTodotitle}/>
                <div className={s.delete}><IconButton
                    onClick={() => props.removeTodoList(props.id)}><DeleteForeverIcon/></IconButton></div>
            </h3>

            <AddItemForm addItems={addTask}/>

            {/*<div>*/}
            {/*    <input className={error ? 'error' : ""}*/}
            {/*           value={title}*/}
            {/*           onChange={onChangeHandlerInput}*/}
            {/*           onKeyPress={onKeyHandlerInput}*/}

            {/*    />*/}


            {/*    <button onClick={addTask}>+*/}
            {/*    </button>*/}
            {/*    {error ? <div className={'error-message'}>{error}</div> : null}*/}
            {/*</div>*/}

            {props.tasks.map((i: PropsTypeTask) => {
                const removeTask = () => {
                    props.delete(i.id, props.id)
                }
                const changeTaskNew = (title: string) => {
                    props.changeTaskTitle(i.id, title, props.id)
                }
                const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatus(i.id, e.currentTarget.checked, props.id)
                }
                return (<div key={i.id}>
                        <div><Checkbox color={"primary"}
                            onChange={changeStatus}
                            checked={i.isDone}/>
                            <EditSpan title={i.title} isDone={i.isDone}
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