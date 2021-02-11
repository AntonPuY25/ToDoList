import React,{useReducer} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList/ToDoList";
import {PropsTypeTask} from './ToDoList/ToDoList';
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {changeTodolistFilterAC, RemoveTodolistAC, TodolistReducer} from "./state/todolistReducer";
import {
    addTaskAC,
    AddTodilistAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    taskReducer
} from "./state/taskReducer";




export type FilterTypes = "all" | "active" | "completed";
export type TypeTaskState = {
    [key: string]: Array<PropsTypeTask>
}
export type ToDoListsType = {
    id: string
    title: string
    filter: FilterTypes

}
export const todolistID1 = v1();
export const todolistID2 = v1();

export function AppWithReducer() {
    const [todolists, dispatchToDoList] = useReducer(TodolistReducer,[
            {id: todolistID1, title: 'What to Learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'},
        ]
    )


    let [tasks, dispatchTask] = useReducer(taskReducer,{
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

    function addTask(title: string,toDoListId: string) {

        const action = addTaskAC(title,toDoListId)
        dispatchTask(action)

    }

    let deleteTask = (id: string, toDoListId: string) => {
     dispatchTask(removeTaskAC(id,toDoListId))
    }


    function changeFilter(filterValue: FilterTypes, toDoListID: string) {
      dispatchToDoList(changeTodolistFilterAC(toDoListID,filterValue))
    }

    function removeTodoList(toDoListID: string) {
      dispatchToDoList(RemoveTodolistAC(toDoListID))
        dispatchTask(RemoveTodolistAC(toDoListID))
    }

    function changeStatus(taskId: string, isDone: boolean, toDiListId: string) {
        dispatchTask(changeTaskStatusAC(taskId,isDone,toDiListId))
    }

    function addToDoList(todolistTitle: string) {

        const action = AddTodilistAC(todolistTitle)
        dispatchTask(action)
        dispatchToDoList(action)
    }

    function changeTaskTitle(taskId: string, title: string, toDiListId: string) {
        dispatchTask(changeTaskTitleAC(taskId, title, toDiListId))
    }
    function changeTodolistTitle(title: string,toDiListId: string) {
       dispatchTask(addTaskAC(title,toDiListId))
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
                    return <Grid style={{padding: '10px'}} key={newToDoList.id} item xs={3}>
                        <Paper elevation={5} style={{padding: '10px'}}>
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

export default AppWithReducer;

