import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    taskReducer,
    TypeTaskReducer
} from "./taskReducer";
import {AddTodilistAC, RemoveTodolistAC} from "./todolistReducer";
import {PriorityType, TypeStatusTask} from "../dall/todolists-api";
import {v1} from "uuid";

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
                id: v1(),
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
                id: v1(),
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
                id: v1(),
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
                id: v1(),
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
                id: v1(),
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
                id: v1(),
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
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "3", title: "tea", isDone: false}
        ]
    });

});


test('correct task should be added to correct array', () => {


    const action = addTaskAC("juce",'1');

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juce');
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

    expect(endState['todolistId1'][1].title).toBe("JS");
    expect(endState['todolistId2'][1].title).toBe('New Task');
});


test('new array should be added when new todolist is added', () => {


    const action = AddTodilistAC("new todolist");

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



