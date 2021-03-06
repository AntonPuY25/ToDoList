import {
    addTaskTC, getTaskTC,
    removeTaskTC,
    taskReducer,
    TypeTaskReducer, updateTaskTitleTC
} from "./taskReducer";
import {PriorityType, TypeStatusTask} from "../dall/todolists-api";
import {addTodolistTC, removeTodolistTC} from "./todolistReducer";

let startState: TypeTaskReducer;


beforeEach(() => {
    startState = {
        "todolistId1": [
            {   description: "",
                title: 'CSS',
                completed: true,
                status: TypeStatusTask.New,
                priority: PriorityType.Hi,
                startDate: "",
                deadline: "",
                id: '1',
                todoListId: "todolistId1",
                order: 1,
                addedDate:"",
                disabledStatus:false,
            },
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
                addedDate:"",
                disabledStatus:false,
            },
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
                addedDate:"",
                disabledStatus:false,
            },
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
                addedDate:"",
                disabledStatus:false,
            },
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
                addedDate:"",
                disabledStatus:false,
            },
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
                addedDate:"",
                disabledStatus:false,
            },

        ]
    };
})
test('correct task should be deleted from correct array', () => {


    const param = {taskId: "2", todoListId: "todolistId2"};
    const action = removeTaskTC.fulfilled(param,'paramsId',param);

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
                addedDate:"",
                disabledStatus:false},
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
                addedDate:"",
                disabledStatus:false},
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
                addedDate:"",
                disabledStatus:false}
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
                addedDate:"",
                disabledStatus:false},
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
                addedDate:"",
                disabledStatus:false}
        ]
    });

});


test('correct task should be added to correct array', () => {


    const paramAddTassk = {task:{
            description: "",
            title: 'Test',
            completed: true,
            status: TypeStatusTask.New,
            priority: PriorityType.Hi,
            startDate: "",
            deadline: "",
            id: '21',
            todoListId: "todolistId2",
            order: 3,
            addedDate:"",
            disabledStatus:false,}};
    const action = addTaskTC.fulfilled(paramAddTassk,'paramId', {todoListId:paramAddTassk.task.todoListId,title:paramAddTassk.task.title});

    const endState = taskReducer(startState, action)


    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('bread');
    expect(endState["todolistId2"][0].status).toBe(0);
})


test('new array should be added when new todolist is added', () => {


    const paramAddTodolist = {todolist:{
            id:'TestToDo',
            title:"TESSST",
            addedDate:'',
            order:1,
        }};
    const action = addTodolistTC.fulfilled(paramAddTodolist,'paramsId',paramAddTodolist.todolist.title);

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


    const action = removeTodolistTC.fulfilled({todolistId:"todolistId2"},'paramsId','todolistId2');

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
test('get Tasks ',()=>{
    const paramsGetTask = {todoListId:'todolistId1',tasks:[
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
                addedDate:"",
                disabledStatus:false
            },
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
                addedDate:"",
                disabledStatus:false
            },
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
                addedDate:"",
                disabledStatus:false
            },
        ]};
    const endState = taskReducer(startState,getTaskTC.fulfilled(paramsGetTask,'paramsID','todolistId1'))

    expect(endState["todolistId1"][0].title).toBe('CSS')
    expect(endState["todolistId2"].length).toBe(3)
});

test('ChangeTask',()=>{
    const paramsUpdateTask = {task:{description: "",
            title: 'HEY',
            completed: true,
            status: TypeStatusTask.New,
            priority: PriorityType.Hi,
            startDate: "",
            deadline: "",
            id: '3',
            todoListId: "todolistId1",
            order: 3,
            addedDate:"",
            disabledStatus:false
        }};
    let action = updateTaskTitleTC.fulfilled(paramsUpdateTask,'paramsId',{todoListId:paramsUpdateTask.task.todoListId,taskId:paramsUpdateTask.task.id,title:paramsUpdateTask.task.title})

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"][2].title).toBe('HEY')
})



