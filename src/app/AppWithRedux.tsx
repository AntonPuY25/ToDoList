import React, {useCallback, useEffect} from 'react';
import './App.css';
import AddItemForm from "../components/AddItemForm";
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {addTodolistTC, getTodolistsTC} from "../state/todolistReducer";
import Todolists from "../todolists/todolists";
import CustomizedSnackbars from "../components/SnackBarError";
import {AppRootStateType} from "../state/store";
import {isInitialTC, TypeStatus} from "./appReducer";
import {Login} from "../login/login";
import {Redirect, Route} from 'react-router-dom';
import {logoutTC} from "../state/login";

export type TypeFilter = 'all' | 'active' | 'completed';


const AppWithRedux = React.memo(() => {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType,TypeStatus>(state => state.app.status)
    const isInitial = useSelector<AppRootStateType,boolean>(state => state.app.isInitial)
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)

    const addToDoList = useCallback((todolistTitle: string) => {
        dispatch(addTodolistTC(todolistTitle))
    }, [dispatch])

    useEffect(() => {
        dispatch(isInitialTC())
        dispatch(getTodolistsTC())
    }, [dispatch,isAuth])

    if(!isInitial){
        return<div style={{position:'fixed',top:'50%' ,textAlign:'center',width:'100%'}}>
            <CircularProgress />
        </div>
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
                    {isAuth? <Button onClick={()=>{dispatch(logoutTC())}} color="inherit">Log Out</Button>: null}


                </Toolbar>
            </AppBar>
            {status==="loading"?<LinearProgress />:""}
            <Container>
                <Grid container> <AddItemForm addItems={addToDoList}/></Grid>
                <Grid container>
                    {!isAuth?<Redirect to={'/login'}/>: <Todolists/>}
                    <Route exact path={'/'} render={()=><AppWithRedux/>}/>
                    <Route  path={'/login'} render={()=><Login/>}/>
                </Grid>
                <CustomizedSnackbars/>


            </Container>
        </div>


    );
})

export default AppWithRedux;

