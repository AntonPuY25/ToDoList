import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList/ToDoList";
import {PropsTypeTask} from './ToDoList/ToDoList';
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


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
    type TypeTaskStateTest = {
        [key: string]: []
    }
    let [tasks, setTasks] = useState<TypeTaskState>({
            [todolistID1]: [
                {id: v1(), title: 'Html', isDone: true},
                {id: v1(), title: 'Css', isDone: false},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'React', isDone: false}
                ],
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

    function addToDoList(todolistTitle: string) {
        const todolistId = v1();
        const newToDolist: ToDoListsType = {
            id: todolistId,
            title: todolistTitle,
            filter: 'all'
        }
// const newTask:TypeTaskState = ({
//     [todolistId]: []
// })
        setTasks({...tasks, [todolistId]: []})
        setTodolists([...todolists, newToDolist])
    }

    function changeTaskTitle(taskId: string, title: string, toDiListId: string) {

        let todolistTasks = tasks[toDiListId]
        const task = todolistTasks.find(t => t.id === taskId)
        if (task) {
            task.title = title
        }
        setTasks({...tasks})
    }

    function changeTodolistTitle(title: string, toDiListId: string) {
        let todo = (todolists.find(tl => tl.id === toDiListId))
        if (todo) {
            todo.title = title
        }
        setTasks({...tasks})
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container> <AddItemForm addItems={addToDoList}/></Grid>
                <Grid container>{todolists.map((newToDoList: ToDoListsType) => {

                    let resultTask = tasks[newToDoList.id];

                    if (newToDoList.filter === "active") {
                        resultTask = tasks[newToDoList.id].filter(t => t.isDone === false)
                    }
                    if (newToDoList.filter === "completed") {
                        resultTask = tasks[newToDoList.id].filter(t => t.isDone === true)
                    }
                    return <Grid style={{padding:'10px'}} key={newToDoList.id} item xs={3}>
                        <Paper elevation={5} style={{padding:'10px'}}>
                            <ToDoList id={newToDoList.id}
                                      title={newToDoList.title} tasks={resultTask}
                                      addTask={addTask} delete={deleteTask} changeStatus={changeStatus}
                                      changeFilter={changeFilter} filter={newToDoList.filter}
                                      removeTodoList={removeTodoList} changeTaskTitle={changeTaskTitle}
                                      changeTodolistTitle={changeTodolistTitle}/>
                        </Paper>
                    </Grid>
                })}</Grid>
            </Container>

        </div>


    );
}

export default App;

