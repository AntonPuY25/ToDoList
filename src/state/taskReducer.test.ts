import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC, getTasksAC,
    removeTaskAC,
    taskReducer,
    TypeTaskReducer
} from "./taskReducer";
import {AddTodolistAC, RemoveTodolistAC} from "./todolistReducer";
import {PriorityType, TypeStatusTask} from "../dall/todolists-api";

let startState: TypeTaskReducer;


beforeEach(() => {
    startState = {
        "todolistId1": [
            {description: "",
                title: 'CSS',
                completed: true,
                status: TypeStatusTask.New,
                priority: PriorityType.Hi,
                startDate: "",
                deadline: "",
                id: '1',
                todoListId: "todolistId1",
                order: 1,
                addedDate:""},
            {description: "",
                title: 'HTML',
                completed: true,
                status: TypeStatusTask.New,
                priority: PriorityType.Hi,
                startDate: "",
                deadline: "",
                id: '2',
                todoListId: "todolistId1",
                order: 2,
                addedDate:""},
            {description: "",
                title: 'JS',
                completed: true,
                status: TypeStatusTask.New,
                priority: PriorityType.Hi,
                startDate: "",
                deadline: "",
                id: '3',
                todoListId: "todolistId1",
                order: 3,
                addedDate:""},
        ],
        "todolistId2": [
            {description: "",
                title: 'bread',
                completed: true,
                status: TypeStatusTask.New,
                priority: PriorityType.Hi,
                startDate: "",
                deadline: "",
                id: '1',
                todoListId: "todolistId2",
                order: 1,
                addedDate:""},
            {description: "",
                title: 'milk',
                completed: true,
                status: TypeStatusTask.Completed,
                priority: PriorityType.Hi,
                startDate: "",
                deadline: "",
                id: '2',
                todoListId: "todolistId2",
                order: 2,
                addedDate:""},
            {description: "",
                title: 'sugar',
                completed: true,
                status: TypeStatusTask.New,
                priority: PriorityType.Hi,
                startDate: "",
                deadline: "",
                id: '3',
                todoListId: "todolistId2",
                order: 3,
                addedDate:""},

        ]
    };
})
test('correct task should be deleted from correct array', () => {


    const action = removeTaskAC("2", "todolistId2");

    const endState = taskReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {description: "",
                title: 'CSS',
                completed: true,
                status: TypeStatusTask.New,
                priority: PriorityType.Hi,
                startDate: "",
                deadline: "",
                id: '1',
                todoListId: "todolistId1",
                order: 1,
                addedDate:""},
            {description: "",
                title: 'HTML',
                completed: true,
                status: TypeStatusTask.New,
                priority: PriorityType.Hi,
                startDate: "",
                deadline: "",
                id: '2',
                todoListId: "todolistId1",
                order: 2,
                addedDate:""},
            {description: "",
                title: 'JS',
                completed: true,
                status: TypeStatusTask.New,
                priority: PriorityType.Hi,
                startDate: "",
                deadline: "",
                id: '3',
                todoListId: "todolistId1",
                order: 3,
                addedDate:""}
        ],
        "todolistId2": [
            {description: "",
                title: 'bread',
                completed: true,
                status: TypeStatusTask.New,
                priority: PriorityType.Hi,
                startDate: "",
                deadline: "",
                id: '1',
                todoListId: "todolistId2",
                order: 1,
                addedDate:""},
            {description: "",
                title: 'sugar',
                completed: true,
                status: TypeStatusTask.New,
                priority: PriorityType.Hi,
                startDate: "",
                deadline: "",
                id: '3',
                todoListId: "todolistId2",
                order: 3,
                addedDate:""}
        ]
    });

});


test('correct task should be added to correct array', () => {


    const action = addTaskAC("juice",'1');

    const endState = taskReducer(startState, action)


    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juice');
    expect(endState["todolistId2"][0].status).toBe(0);
})
test('status of specified task should be changed', () => {


    const action = changeTaskStatusAC("2", 0, "todolistId2");

    const endState = taskReducer(startState, action)

    expect(endState['todolistId2'][2].status).toBe(0);
    expect(endState['todolistId2'].length).toBe(3);
});

test('status of specified task should be changed', () => {

    const action = changeTaskTitleAC("2", 'New Task', "todolistId2");

    const endState = taskReducer(startState, action)

    expect(endState['todolistId1'][1].title).toBe("HTML");
    expect(endState['todolistId2'][1].title).toBe('New Task');
});


test('new array should be added when new todolist is added', () => {


    const action = AddTodolistAC("new todolist");

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {


    const action = RemoveTodolistAC("todolistId2");

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
test('get Tasks ',()=>{
    const endState = taskReducer(startState,getTasksAC('todolistId1',[
        {description: "",
            title: 'CSS',
            completed: true,
            status: TypeStatusTask.New,
            priority: PriorityType.Hi,
            startDate: "",
            deadline: "",
            id: '1',
            todoListId: "todolistId1",
            order: 1,
            addedDate:""},
        {description: "",
            title: 'HTML',
            completed: true,
            status: TypeStatusTask.New,
            priority: PriorityType.Hi,
            startDate: "",
            deadline: "",
            id: '2',
            todoListId: "todolistId1",
            order: 2,
            addedDate:""},
        {description: "",
            title: 'JS',
            completed: true,
            status: TypeStatusTask.New,
            priority: PriorityType.Hi,
            startDate: "",
            deadline: "",
            id: '3',
            todoListId: "todolistId1",
            order: 3,
            addedDate:""},
    ]))

    expect(endState["todolistId1"][0].title).toBe('CSS')
    expect(endState["todolistId2"].length).toBe(3)
})


