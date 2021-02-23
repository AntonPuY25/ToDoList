import userReducer, {TypeState} from "./userReducer";

test('increment test',()=>{
    const user:TypeState = {
        name:"Bob",
        age:27,
        childrenCount:2
    }

    const newState = userReducer(user,{type:'INCREMENT-AGE'})
    expect(newState.age).toBe(28)
})