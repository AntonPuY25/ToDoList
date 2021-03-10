import {todolistID1, todolistID2} from "../AppWithRedux";
import {TypeTaskReducer} from "../state/taskReducer";
import {PriorityType, TypeStatusTask, TypeTaskItems} from "../dall/todolists-api";


let tasks:TypeTaskReducer


beforeEach(()=>{
     tasks={
        [todolistID1]: [
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
        [todolistID2]: [
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

        ]

    }
})


test('Check addTask ',()=>{



    function addTask(title: string, toDoListId: string) {

        const newTask: TypeTaskItems = {
            description: "",
            title: 'Hello',
            completed: true,
            status: TypeStatusTask.New,
            priority: PriorityType.Hi,
            startDate: "",
            deadline: "",
            id: '4',
            todoListId: "todolistId1",
            order: 1,
            addedDate:""
        }
        tasks[toDoListId] = [newTask, ...tasks[toDoListId]]
    }
addTask('Hello',todolistID1)


    expect(tasks[todolistID1].length).toBe(4)
    expect(tasks[todolistID2]).toEqual([
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
    ])
    expect(tasks[todolistID2][0].id).toBe('1')
    expect(tasks[todolistID1]).toEqual( [
        {description: "",
            title: 'Hello',
            completed: true,
            status: TypeStatusTask.New,
            priority: PriorityType.Hi,
            startDate: "",
            deadline: "",
            id: '4',
            todoListId: "todolistId1",
            order: 1,
            addedDate:""},
        {description: "",
            title: 'CSS',
            completed: true,
            status: TypeStatusTask.New,
            priority: PriorityType.Hi,
            startDate: "",
            deadline: "",
            id: '1',
            todoListId: "todolistId1",
            order:1,
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
    ])

})

test ("Check deleteTask",()=>{
    let deleteTask = (id: string, toDoListId: string) => {
        let toDoListTask = tasks[toDoListId]
        tasks[toDoListId] = toDoListTask.filter((tasks: TypeTaskItems) => {
            return tasks.id !== id
        })
    }
     deleteTask('1',todolistID1)

    expect(tasks[todolistID1].length).toBe(2)
    expect(tasks[todolistID2].length).toBe(3)
    expect(tasks[todolistID1][0].title).toBe('HTML')

})
test('Check changeStatus',()=>{

    function changeStatus(taskId: string, status: TypeStatusTask, toDiListId: string) {
        let todolistTasks = tasks[toDiListId]
        const task = todolistTasks.find(t => t.id === taskId)

        if (task) {
            task.status =TypeStatusTask.New
        }}
        changeStatus('1',0,todolistID1)
        changeStatus('1',0,todolistID2)
    expect(tasks[todolistID1][0].status).toBe(0)
    expect(tasks[todolistID2][0].status).toBe(0)
    expect(tasks[todolistID1][2].status).toBe(0)
})