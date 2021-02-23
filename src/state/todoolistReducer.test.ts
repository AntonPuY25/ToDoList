import {v1} from "uuid";
import {FilterTypes, ToDoListsType} from "../App";
import {
    AddTodilistAC,
    ChangeToddolistAC,
    changeTodolistFilterAC,
    RemoveTodolistAC,
    TodolistReducer
} from "./todolistReducer";

let todolistId1: string;
let todolistId2: string;
let newFilter: FilterTypes = 'all';
let startState: Array<ToDoListsType>
let newTodolistTitle: string;
beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    newTodolistTitle = "New Todolist";
    newFilter = 'all';
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
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
