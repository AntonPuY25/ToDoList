import React, {useCallback, useEffect} from 'react';
import './App.css';
import AddItemForm from "../components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {addTodolistTC, getTodolistsTC} from "../state/todolistReducer";
import Todolists from "../todolists/todolists";

export type TypeFilter = 'all' | 'active' | 'completed';


const AppWithRedux = React.memo(() => {
    const dispatch = useDispatch()

    const addToDoList = useCallback((todolistTitle: string) => {
        dispatch(addTodolistTC(todolistTitle))
    }, [dispatch])

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [dispatch])
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
                <Grid container>
                    <Todolists/>
                </Grid>
            </Container>

        </div>


    );
})

export default AppWithRedux;

