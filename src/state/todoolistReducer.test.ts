import {v1} from "uuid";
import {
    AddTodilistAC,
    ChangeToddolistAC,
    changeTodolistFilterAC,
    RemoveTodolistAC, setTodolist,
    TodolistReducer, TypeTodolistReducer
} from "./todolistReducer";
import {TypeFilter} from "../AppWithRedux";

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
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 1},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 2}
    ]
})
test('correct filter of todolist should be changed', () => {

    const endState = TodolistReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
test('correct todolist should be added', () => {
    const endState = TodolistReducer(startState, AddTodilistAC(newTodolistTitle))
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});
test('correct todolist should change its name', () => {


    const endState = TodolistReducer(startState, ChangeToddolistAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct todolist should be removed', () => {
    const endState = TodolistReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('get Todolists',()=>{
    const endState = TodolistReducer(startState,setTodolist(startState))

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe("What to learn")
})
