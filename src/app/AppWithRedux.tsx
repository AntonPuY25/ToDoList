import React, {useCallback, useEffect} from 'react';
import './App.css';
import AddItemForm from "../components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {addTodolistTC, getTodolistsTC} from "../state/todolistReducer";
import Todolists from "../todolists/todolists";
import CustomizedSnackbars from "../components/SnackBarError";
import {AppRootStateType} from "../state/store";
import {TypeStatus} from "./appReducer";

export type TypeFilter = 'all' | 'active' | 'completed';


const AppWithRedux = React.memo(() => {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType,TypeStatus>(state => state.app.status)
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
            {status==="loading"?<LinearProgress />:""}
            <Container>
                <Grid container> <AddItemForm addItems={addToDoList}/></Grid>
                <Grid container>
                    <Todolists/>
                </Grid>
                <CustomizedSnackbars/>
            </Container>

        </div>


    );
})

export default AppWithRedux;

