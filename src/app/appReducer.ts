
const initialState:TypeInitialSate = {
    status:"free",
    error:null
}

const AppReducer=(state:TypeInitialSate=initialState,action:TypeActions):TypeInitialSate=>{

        switch(action.type){
            case "appReducer/SET_ERROR":{
                return{
                    ...state,
                    error:action.error
                }
            }
            case "appReducer/SET_STATUS":{
                return{
                    ...state,
                    status:action.status
                }
            }

            default:return state

        }

}


export const setStatusAC = (status:TypeStatus)=>({type:'appReducer/SET_STATUS',status} as const)
export const setErrorAC = (error:string|null)=>({type:'appReducer/SET_ERROR',error} as const)

export type TypeSetStatusAction = ReturnType<typeof setStatusAC>
export type TypeSetErrorAction = ReturnType<typeof setErrorAC>
type TypeActions =
    |TypeSetErrorAction
    |TypeSetStatusAction;
type TypeInitialSate = {
    status:TypeStatus
    error:string|null
}
export type TypeStatus = 'free'|'loading'|'error'|'succeeded';
export default AppReducer;


