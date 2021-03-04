import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '9943ad9b-2b43-46f7-bddd-09fd21e745ce'
    }

})
type TypeTodolist = {
    id: string
    title: string
    addedDate: string
    order: number
}
type TypeData = {
    item: TypeTodolist
}
type TypeResponseDeleteAndUpdate<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}
type TypeTaskItems = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type TypeResponseTask = {
    items: Array<TypeTaskItems>
    totalCount: number
    error: boolean
}

const GetApi = {
    getTodoLists: () => {
        return instance.get<TypeTodolist>('todo-lists')
    },
    setTodolist: (title: string) => {
        return instance.post<TypeResponseDeleteAndUpdate<TypeData>>(`todo-lists`, {title})
    },
    removeTodolist: (todolistId: string) => {
        return instance.delete<TypeResponseDeleteAndUpdate>(`todo-lists/${todolistId}`)
    },
    updateTodolist: (todolistId: string, title: string) => {
        return instance.put<TypeResponseDeleteAndUpdate>(`todo-lists/${todolistId}`, {title})
    },
    getTasks: (todolistId: string) => {
        return instance.get<TypeResponseTask>(`todo-lists/${todolistId}/tasks?count=10&page=1`)
    },
    createTask: (todolistId: string, title: string) => {
        return instance.post<TypeResponseDeleteAndUpdate>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask: (todolistId: string, taskId: string) => {
        return instance.delete<TypeResponseDeleteAndUpdate>(`/todo-lists/${todolistId}/tasks/${taskId}`,)
    },
    updateTask: (todolistId: string, taskId: string, title: string) => {
        return instance.put<TypeResponseDeleteAndUpdate<TypeData>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {
            title,
        })
    }
}
export default GetApi;