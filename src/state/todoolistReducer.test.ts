import {v1} from "uuid";
import {
    AddTodolistAC,
    ChangeTodolistAC,
    changeTodolistFilterAC,
    RemoveTodolistAC, setTodolist,
    TodolistReducer, TypeTodolistReducer
} from "./todolistReducer";
import {TypeFilter} from "../app/AppWithRedux";

let todolistId1: string;
let todolistId2: string;
let newFilter: TypeFilter = 'all';
let startState: Array<TypeTodolistReducer>
let newTodolistTitle: string;
beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    newTodolistTitle = "New Todolist";
    newFilter = 'all';
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 1,disabledStatus:false},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 2,disabledStatus:false}
    ]
})
test('correct filter of todolist should be changed', () => {

    const endState = TodolistReducer(startState, changeTodolistFilterAC({id:todolistId2, filter:newFilter}));
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
test('correct todolist should be added', () => {
    const endState = TodolistReducer(startState, AddTodolistAC({todolist:{id: 'todolistId3', title:newTodolistTitle, addedDate: "", order: 3}}))
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});
test('correct todolist should change its name', () => {


    const endState = TodolistReducer(startState, ChangeTodolistAC({todolistId:todolistId2, title:newTodolistTitle}));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct todolist should be removed', () => {
    const endState = TodolistReducer(startState, RemoveTodolistAC({todolistId:todolistId1}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('get Todolists',()=>{
    const endState = TodolistReducer(startState,setTodolist({todolists:startState}))

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe("What to learn")
})
