export type TypeState = {
    name:string
    age:number
    childrenCount:number
}
export type TypeAction = {
    type:string
    [key:string]:any
}


function userReducer(state:TypeState,action:TypeAction):TypeState{

    switch (action.type){
        case 'INCREMENT-AGE':
            return {
                ...state,age:state.age+1
            }
        case 'INCREMENT-CHILDRE-COUNT':
            return {
                ...state,childrenCount:state.childrenCount+1
            }
        case 'CHANGE_NAME':
            return {
                ...state,name:action.newName
            }
        default:
            return state
    }


}

export default userReducer;