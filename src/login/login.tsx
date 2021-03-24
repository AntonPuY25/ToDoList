import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {Redirect} from "react-router-dom";
import {getIsAuthTC} from "../state/login";
export type TypeFormikError = {
    email:string
    password:string
    rememberMe:boolean
}
export const Login = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)
    const formik = useFormik({
       validate:(values:TypeFormikError)=>{
            if(!values.email){
                return {
                    email:'Email is required'
                }
            }
           if(!values.password){
               return {
                   password:'Password is required'
               }
           }
       },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(getIsAuthTC(values))
            console.log(values)
        },
    })
if(isAuth){
    return  <Redirect to={'/ToDoList'}/>
}
    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}>here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <FormGroup>
                    <TextField
                        label="Email"
                        margin="normal"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.errors.email?<div style={{color:'red'}}>{formik.errors.email}</div>:null}

                    <TextField
                        type="password"
                        label="Password"
                        margin="normal"
                        {...formik.getFieldProps('password')}

                    />
                    {formik.errors.password?<div style={{color:'red'}}>{formik.errors.password}</div>:null}

                    <FormControlLabel
                        label={'Remember me'}
                        control={<Checkbox />}
                        {...formik.getFieldProps('rememberMe')}

                    />
                    <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                </FormGroup>
            </FormControl>
            </form>
        </Grid>
    </Grid>
}
