import {AddTodolistAC, taskReducer} from "./taskReducer";
import {TodolistReducer} from "./todolistReducer";
import {ToDoListsType, TypeTaskState} from "../App";

test('ids should be equals', () => {
    const startTasksState: TypeTaskState = {};
    const startTodolistsState: Array<ToDoListsType> = [];

    const action = AddTodilistAC("new todolist",);

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = TodolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});


