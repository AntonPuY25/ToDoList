import {todolistID1, todolistID2, TypeTaskState} from "../AppWithRedux";
import {PropsTypeTask} from "./ToDoList";



let tasks:TypeTaskState


beforeEach(()=>{
     tasks={
        [todolistID1]: [
            {id: "1", title: 'Html', isDone: true},
            {id: "2", title: 'Css', isDone: false},
            {id: "3", title: 'JS', isDone: true},
            {id: "4", title: 'React', isDone: false}
        ],
        [todolistID2]: [
            {id: "1", title: 'Milk', isDone: true},
            {id: "2", title: 'Bread', isDone: false},
            {id: "3", title: 'Butter', isDone: true},

        ]

    }
})


test('Check addTask ',()=>{



    function addTask(title: string, toDoListId: string) {

        const newTask: PropsTypeTask = {
            id: "5",
            title: title,
            isDone: false
        }
        tasks[toDoListId] = [newTask, ...tasks[toDoListId]]
    }
addTask('Hello',todolistID1)


    expect(tasks[todolistID1].length).toBe(5)
    expect(tasks[todolistID2]).toEqual([
        {
            "id": "1",
            "isDone": true,
            "title": "Milk"
        },
        {
            "id": "2",
            "isDone": false,
            "title": "Bread"
        },
        {
            "id": "3",
            "isDone": true,
            "title": "Butter"
        }
    ])
    expect(tasks[todolistID2][0].id).toBe('1')
    expect(tasks[todolistID1]).toEqual( [
        {id: "5", title: 'Hello', isDone: false},
        {id: "1", title: 'Html', isDone: true},
        {id: "2", title: 'Css', isDone: false},
        {id: "3", title: 'JS', isDone: true},
        {id: "4", title: 'React', isDone: false}
    ])

})

test ("Check deleteTask",()=>{
    let deleteTask = (id: string, toDoListId: string) => {
        let toDoListTask = tasks[toDoListId]
        tasks[toDoListId] = toDoListTask.filter((tasks: PropsTypeTask) => {
            return tasks.id !== id
        })
    }
     deleteTask('1',todolistID1)

    expect(tasks[todolistID1].length).toBe(3)
    expect(tasks[todolistID2].length).toBe(3)
    expect(tasks[todolistID1][0].title).toBe('Css')

})
test('Check changeStatus',()=>{

    function changeStatus(taskId: string, isDone: boolean, toDiListId: string) {
        let todolistTasks = tasks[toDiListId]
        const task = todolistTasks.find(t => t.id === taskId)

        if (task) {
            task.isDone = isDone
        }}
        changeStatus('1',false,todolistID1)
        changeStatus('1',false,todolistID2)
    expect(tasks[todolistID1][0].isDone).toBe(false)
    expect(tasks[todolistID2][0].isDone).toBe(false)
    expect(tasks[todolistID1][2].isDone).toBe(true)
})