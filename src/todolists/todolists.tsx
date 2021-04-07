import React from 'react';
import {TypeTodolistReducer} from "../state/todolistReducer";
import {Grid, Paper} from "@material-ui/core";
import {ToDoList} from "../ToDoList/ToDoList";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";

const Todolists = () => {
    const todolists = useSelector<AppRootStateType, Array<TypeTodolistReducer>>(state => state.todolists)


    return <>

        {todolists.map((newToDoList: TypeTodolistReducer) => {

            return <Grid style={{padding: '10px'}} key={newToDoList.id} item xs={3}>
                <Paper elevation={5} style={{padding: '10px'}}>
                    <ToDoList todolist={newToDoList} />


                </Paper>
            </Grid>
        })}
        </>}
        export default Todolists