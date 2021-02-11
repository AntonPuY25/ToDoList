import React from 'react';
import './App.css';
import {ToDoList} from "./ToDoList/ToDoList";
import {PropsTypeTask} from './ToDoList/ToDoList';
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {changeTodolistFilterAC, RemoveTodolistAC} from "./state/todolistReducer";
import {
    addTaskAC,
    AddTodilistAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,

} from "./state/taskReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";




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

export function AppWithRedux() {
    const todolists = useSelector<AppRootStateType,Array<ToDoListsType>>(state=>state.todolists)
    const tasks = useSelector<AppRootStateType,TypeTaskState>(state =>state.tasks)
    const dispatch = useDispatch()

    function addTask(title: string,toDoListId: string) {
        dispatch(addTaskAC(title,toDoListId))

    }

    let deleteTask = (id: string, toDoListId: string) => {
        dispatch(removeTaskAC(id,toDoListId))
    }


    function changeFilter(filterValue: FilterTypes, toDoListID: string) {
        dispatch(changeTodolistFilterAC(toDoListID,filterValue))
    }

    function removeTodoList(toDoListID: string) {
        dispatch(RemoveTodolistAC(toDoListID))
        dispatch(RemoveTodolistAC(toDoListID))
    }

    function changeStatus(taskId: string, isDone: boolean, toDiListId: string) {
        dispatch(changeTaskStatusAC(taskId,isDone,toDiListId))
    }

    function addToDoList(todolistTitle: string) {

        dispatch(AddTodilistAC(todolistTitle))

    }

    function changeTaskTitle(taskId: string, title: string, toDiListId: string) {
        dispatch(changeTaskTitleAC(taskId, title, toDiListId))
    }
    function changeTodolistTitle(title: string,toDiListId: string) {
        dispatch(addTaskAC(title,toDiListId))
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

export default AppWithRedux;

