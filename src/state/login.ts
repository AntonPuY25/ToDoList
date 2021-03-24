import {Dispatch} from "redux";
import {TypeFormikError} from "../login/login";
import {getIsAuth} from "../dall/todolists-api";
import {setErrorAC, setStatusAC, TypeSetErrorAction, TypeSetStatusAction} from "../app/appReducer";

const initialState: TypeInitialState = {
    isAuth: false
}
export const setIsAuthAC = (isAuth: boolean) => ({type: 'login/SET_IS_AUTH', isAuth} as const)

const LoginReducer = (state: TypeInitialState = initialState, action: TypeAction): TypeInitialState => {

    switch (action.type) {
        case "login/SET_IS_AUTH": {
            return {
                ...state,
                isAuth: action.isAuth
            }
        }

        default:
            return state

    }
}

export const getIsAuthTC = (values: TypeFormikError) => async (dispatch: Dispatch<TypeAction | TypeSetErrorAction
    | TypeSetStatusAction>) => {
    try {
        dispatch(setStatusAC('loading'))
        let result = await getIsAuth.login(values.email, values.password, values.rememberMe)
        if (result.resultCode === 0) {
            dispatch(setStatusAC('succeeded'))
            dispatch(setIsAuthAC(true))
        } else {
            dispatch(setStatusAC('error'))
            dispatch(setErrorAC(result.messages[0]))
        }
    } catch (e) {
        dispatch(setStatusAC('error'))
        dispatch(setErrorAC(e.toString()))

    }

}
export const logoutTC = () => async (dispatch: Dispatch<TypeAction | TypeSetErrorAction
    | TypeSetStatusAction>) => {
    try {
        dispatch(setStatusAC('loading'))
        let result = await getIsAuth.logout()
        if (result.resultCode === 0) {
            dispatch(setStatusAC('succeeded'))
            dispatch(setIsAuthAC(false))
        } else {
            dispatch(setStatusAC('error'))
            dispatch(setErrorAC(result.messages[0]))
        }
    } catch (e) {
        dispatch(setStatusAC('error'))
        dispatch(setErrorAC(e.toString()))

    }

}
export type TypeGetIsAuth = ReturnType<typeof setIsAuthAC>
type TypeAction =
    | TypeGetIsAuth

type TypeInitialState = {
    isAuth: boolean
}


export default LoginReducer;