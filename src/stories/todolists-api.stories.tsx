import React, {ChangeEvent} from 'react';
import {useEffect, useState} from "react";
import GetApi from "../dall/todolists-api";
import {Meta, Story} from "@storybook/react/types-6-0";

const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        GetApi.getTodoLists()
            .then(res => setState(res))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

const CreateTodoLists = () => {
    const [state, setState] = useState<any>(null)
    const [textTodolist, setText] = useState<string>("")

    const createTodolist = () => {
        GetApi.setTodolist(textTodolist)
            .then(res => setState(res.data.data))

    }
    const createTitleTodolist = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    return <div>
        <input type={'text'} value={textTodolist} onChange={createTitleTodolist}/>
        <button onClick={createTodolist}>Create Todolist</button>
        {JSON.stringify(state)}
    </div>
}

const RemoveTodoLists = () => {
    const [state, setState] = useState<any>(null)
    const [textTodolistId, setText] = useState<string>("")

    const deleteTodolist = () => {
        GetApi.removeTodolist(textTodolistId)
            .then(res => setState(res.data))
    }
    const deleteTitleTodolist = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    return <div>
        <input type={'text'} value={textTodolistId} onChange={deleteTitleTodolist}/>
        <button onClick={deleteTodolist}>Delete Todolist</button>
        {JSON.stringify(state)}
    </div>
}

const UpdateTodoLists = () => {
    const [state, setState] = useState<any>(null)
    const [newTextTodolist, setText] = useState<string>("")
    const [TodolistId, setId] = useState<string>("")


    const deleteTodolist = () => {
        GetApi.updateTodolist(TodolistId, newTextTodolist)
            .then(res => setState(res.data))
    }
    const changeTitleTodolist = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    const setTextTodolistID = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.currentTarget.value)
    }
    return <div>
        <label>Title</label>
        <input type={'text'} value={newTextTodolist} onChange={changeTitleTodolist}/>
        <label>Id</label>
        <input type={'text'} value={TodolistId} onChange={setTextTodolistID}/>
        <button onClick={deleteTodolist}>Change Todolist</button>
        {JSON.stringify(state)}
    </div>
}

const  ReorderTodoLists = () => {
    const [state, setState] = useState<any>(null)
    const [reorderTodolist, setReorder] = useState<string>("")
    const [TodolistId, setId] = useState<string>("")


    const reorderTodolistFunc = () => {
        GetApi.reorderTodolist(TodolistId, reorderTodolist)
            .then(res => setState(res.data))
    }
    const changeTitleTodolist = (e: ChangeEvent<HTMLInputElement>) => {
        setReorder(e.currentTarget.value)
    }
    const setTextTodolistID = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.currentTarget.value)
    }
    return <div>
        <label>Reorder</label>
        <input type={'text'} value={reorderTodolist} onChange={changeTitleTodolist}/>
        <label>Id</label>
        <input type={'text'} value={TodolistId} onChange={setTextTodolistID}/>
        <button onClick={reorderTodolistFunc}>Reorder Todolist</button>
        {JSON.stringify(state)}
    </div>
}

const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [TodolistId, setText] = useState<string>("")

    const getTasks = () => {
        GetApi.getTasks(TodolistId)
            .then(res => setState(res.data))
    }

    const createTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    return <div>
        <input type={'text'} value={TodolistId} onChange={createTodolistId}/>
        <button onClick={getTasks}>Get Tasks</button>
        {JSON.stringify(state)}
    </div>
}

const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [TodolistId, setText] = useState<string>("")
    const [textTask, setTextTask] = useState<string>("")

    const createTask = ()=>{
        GetApi.createTask(TodolistId, textTask)
            .then(res => setState(res.data))
    }
    const createTextTask = (e: ChangeEvent<HTMLInputElement>) => {
        setTextTask(e.currentTarget.value)
    }
    const createTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    return <div>
        <label>Todolist ID</label>
        <input type={'text'} value={TodolistId} onChange={createTodolistId}/>
        <label>Title Task</label>
        <input type={'text'} value={textTask} onChange={createTextTask}/>
        <button onClick={createTask}>Create Task</button>
        {JSON.stringify(state)}
    </div>
}

const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [TodolistId, setTodolistId] = useState<string>("")
    const [TaskId, setTaskId] = useState<string>("")

    const deleteTask = ()=>{
        GetApi.deleteTask(TodolistId,
            TaskId)
            .then(res => setState(res.data))
    }


    const createTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    const createTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    return <div>
        <label>Todolist ID</label>
        <input type={'text'} value={TodolistId} onChange={createTodolistId}/>
        <label>Task ID</label>
        <input type={'text'} value={TaskId} onChange={createTaskId}/>
        <button onClick={deleteTask}>Delete Task</button>
        {JSON.stringify(state)}
    </div>
}

const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [TodolistId, setTodolistId] = useState<string>("")
    const [TaskId, setTaskId] = useState<string>("")
    const [TaskTitle, setTaskTitle] = useState<string>("")
        const changeTask = ()=>{
            GetApi.updateTask(TodolistId,
                TaskId, TaskTitle)
                .then(res => setState(res.data.data.item))
        }


    const createTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    const createTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const changeNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }
    return <div>
        <label>Todolist ID</label>
        <input type={'text'} value={TodolistId} onChange={createTodolistId}/>
        <label>Task ID</label>
        <input type={'text'} value={TaskId} onChange={createTaskId}/>
        <label>Task Title</label>
        <input type={'text'} value={TaskTitle} onChange={changeNewTaskTitle}/>
        <button onClick={changeTask}>Change Task</button>
        {JSON.stringify(state)}
    </div>
}

const ReorderTask = () => {
    const [state, setState] = useState<any>(null)
    const [TodolistId, setTodolistId] = useState<string>("")
    const [TaskId, setTaskId] = useState<string>("")
    const [Reorder, setReorder] = useState<string>("")
        const changeTask = ()=>{
            GetApi.reorderTask(TodolistId,
                TaskId, Reorder)
                .then(res => setState(res.data.data.item))
        }


    const createTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    const createTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const changeNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setReorder(e.currentTarget.value)
    }
    return <div>
        <label>Todolist ID</label>
        <input type={'text'} value={TodolistId} onChange={createTodolistId}/>
        <label>Task ID</label>
        <input type={'text'} value={TaskId} onChange={createTaskId}/>
        <label>Reorder</label>
        <input type={'text'} value={Reorder} onChange={changeNewTaskTitle}/>
        <button onClick={changeTask}>Reorder Task</button>
        {JSON.stringify(state)}
    </div>
}


export default {
    title: 'API',
    component: GetTodoLists, CreateTodoLists, RemoveTodoLists, UpdateTodoLists, GetTasks, CreateTask,
    DeleteTask, UpdateTask,ReorderTodoLists,ReorderTask
} as Meta;

const TemplateGet: Story = () => <GetTodoLists/>;
const Template1Create: Story = () => <CreateTodoLists/>
const TemplateDelete: Story = () => <RemoveTodoLists/>
const TemplateUpdate: Story = () => <UpdateTodoLists/>
const TemplateReorderTodoLists: Story = () => <ReorderTodoLists/>
const TemplateGetTasks: Story = () => <GetTasks/>
const TemplateCreateTask: Story = () => <CreateTask/>
const TemplateDeleteTask: Story = () => <DeleteTask/>
const TemplateUpdateTask: Story = () => <UpdateTask/>
const TemplateReorderTask: Story = () => <ReorderTask/>


export const GetTodoLists_ = TemplateGet.bind({});
export const CreateTodolist_ = Template1Create.bind({});
export const DeleteTodolist_ = TemplateDelete.bind({});
export const UpdateTodoList_ = TemplateUpdate.bind({});
export const ReorderTodoLists_ = TemplateReorderTodoLists.bind({});
export const GetTasks_ = TemplateGetTasks.bind({});
export const CreateTask_ = TemplateCreateTask.bind({});
export const DeleteTask_ = TemplateDeleteTask.bind({});
export const UpdateTask_ = TemplateUpdateTask.bind({});
export const ReorderTask_ = TemplateReorderTask.bind({});


