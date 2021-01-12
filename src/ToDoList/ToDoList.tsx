import React, {ChangeEvent} from "react";
import {FilterTypes} from "../App";
import AddItemForm from "../AddItemForm";
import EditSpan from "../editSpan";

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
            <h3><EditSpan title={props.title}
                          changeTaskTitle={changeTodotitle}/>
                <span><button onClick={() => props.removeTodoList(props.id)}>Х</button></span>
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
                return (<ul key={i.id}>
                        <li><input
                            onChange={changeStatus}
                            type="checkbox" checked={i.isDone}/>

                            <EditSpan title={i.title} isDone={i.isDone}
                                      changeTaskTitle={changeTaskNew}/>
                            {/*<span className={(i.isDone === true) ? 'is-done' : ""}>{i.title}</span>*/}
                        </li>

                        <button onClick={removeTask}>X
                        </button>

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