import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList/ToDoList";
import {PropsTypeTask} from './ToDoList/ToDoList';
import {v1} from "uuid";


export type FilterTypes = "all" | "active" | "completed";

type ToDoListsType = {
    id: string
    title: string
    filter: FilterTypes

}
const todolistID1 = v1();
const todolistID2 = v1();

function App() {
    const [todolists, setTodolists] = useState<Array<ToDoListsType>>([
            {id: todolistID1, title: 'What to Learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'},
        ]
    )
    type TypeTaskState = {
        [key: string]: Array<PropsTypeTask>
    }
    let [tasks, setTasks] = useState<TypeTaskState>({
            [todolistID1]: [
                {id: v1(), title: 'Html', isDone: true},
                {id: v1(), title: 'Css', isDone: false},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'React', isDone: false},
                {id: v1(), title: 'Angular', isDone: false},
                {id: v1(), title: 'Vue', isDone: false}],
            [todolistID2]: [
                {id: v1(), title: 'Milk', isDone: true},
                {id: v1(), title: 'Bread', isDone: false},
                {id: v1(), title: 'Butter', isDone: true},

            ]

        }
    )

    function addTask(title: string, toDoListId: string) {

        const newTask: PropsTypeTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        tasks[toDoListId] = [newTask, ...tasks[toDoListId]]
        setTasks({...tasks})
    }

    let deleteTask = (id: string, toDoListId: string) => {
        let toDoListTask = tasks[toDoListId]
        tasks[toDoListId] = toDoListTask.filter((tasks: PropsTypeTask) => {
            return tasks.id !== id
        })
        // setTasks({...tasks,[toDoListId]:tasks[toDoListId].filter(tasks=> tasks.id !== id)})
        setTasks({...tasks})
    }


    function changeFilter(filterValue: FilterTypes, toDoListID: string) {
        const todolist = todolists.find(tl => tl.id === toDoListID)
        if (todolist) {
            todolist.filter = filterValue
            setTodolists([...todolists])
        }
    }

    function removeTodoList(toDoListID: string) {
        setTodolists(todolists.filter(tl => tl.id !== toDoListID))
        delete tasks[toDoListID]
    }

    function changeStatus(taskId: string, isDone: boolean, toDiListId: string) {
        let todolistTasks = tasks[toDiListId]
        const task = todolistTasks.find(t => t.id === taskId)

        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks})


    }

    return (

        <div className="App">

            {todolists.map((newToDoList: ToDoListsType) => {

                let resultTask = tasks[newToDoList.id];

                if (newToDoList.filter === "active") {
                    resultTask = tasks[newToDoList.id].filter(t => t.isDone === false)
                }
                if (newToDoList.filter === "completed") {
                    resultTask = tasks[newToDoList.id].filter(t => t.isDone === true)
                }
                return <ToDoList key={newToDoList.id} id={newToDoList.id}
                                 title={newToDoList.title} tasks={resultTask}
                                 addTask={addTask} delete={deleteTask} changeStatus={changeStatus}
                                 changeFilter={changeFilter} filter={newToDoList.filter}
                                 removeTodoList={removeTodoList}
                />
            })}

        </div>
    );
}

export default App;

