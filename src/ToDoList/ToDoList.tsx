import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterTypes} from "../App";

type PropsType = {
    title: string
    tasks: Array<PropsTypeTask>
    addTask: (title: string, toDoListId: string) => void
    delete: (id: string, toDoListId: string) => void
    changeFilter: (str: FilterTypes, toDoListID: string) => void
    changeStatus: (taskId: string, isDone: boolean, toDiListId: string) => void
    filter: FilterTypes
    id: string
    removeTodoList: (toDoListID: string) => void
}
export type PropsTypeTask = {
    id: string
    title: string
    isDone: boolean

}

export function ToDoList(props: PropsType) {
    let [error, setError] = useState<"Title is Required" | null>(null)
    const [title, setTitle] = useState<string>("")
    const addTask = () => {
        const taskTitle = title.trim()
        if (taskTitle) {
            props.addTask(taskTitle, props.id)
            setTitle('')
        } else {
            setError('Title is Required')
        }


    }
    const onChangeHandlerInput = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(null)
    }
    const onKeyHandlerInput = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') addTask()
    }
    const onAllKeyHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveKeyHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedKeyHandler = () => {
        props.changeFilter('completed', props.id)
    }

    return (<div>
        <div>
            <h3>{props.title}
                <span><button onClick={() => props.removeTodoList(props.id)}>Х</button></span>
            </h3>


            <div>
                <input className={error ? 'error' : ""}
                       value={title}
                       onChange={onChangeHandlerInput}
                       onKeyPress={onKeyHandlerInput}

                />


                <button onClick={addTask}>+
                </button>
                {error ? <div className={'error-message'}>{error}</div> : null}
            </div>

            {props.tasks.map((i: PropsTypeTask) => {
                const removeTask = () => {
                    props.delete(i.id, props.id)
                }
                const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatus(i.id, e.currentTarget.checked, props.id)
                }
                return (<ul key={i.id}>
                        <li><input
                            onChange={changeStatus}
                            type="checkbox" checked={i.isDone}/>
                            <span className={(i.isDone === true) ? 'is-done' : ""}>{i.title}</span></li>
                        <li>
                            <button onClick={removeTask}>X
                            </button>
                        </li>
                    </ul>

                )
            })}


            <div>
                <button className={(props.filter === 'all' ? 'btn' : "")} onClick={onAllKeyHandler}>All
                </button>
                <button className={(props.filter === 'active' ? 'btn' : "")}
                        onClick={onActiveKeyHandler}>Active
                </button>
                <button className={(props.filter === 'completed' ? 'btn' : "")}
                        onClick={onCompletedKeyHandler}>Completed
                </button>
            </div>
        </div>
    </div>)
}