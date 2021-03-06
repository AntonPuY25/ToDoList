import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'c9a11d0b-1bf4-4a0d-8b85-3f35229d5cc6'
    }
})

export enum PriorityType {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export enum TypeStatusTask {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export type TypeTodolist = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TypeData = {
    item: TypeTodolist
}
export type TypeResponseDeleteAndUpdate<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}
export type TypeTaskItems = {
    description: string
    title: string
    completed: boolean
    status: TypeStatusTask
    priority: PriorityType
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}&{disabledStatus:boolean}
export type TypeResponseTask = {
    items: Array<TypeTaskItems>
    totalCount: number
    error: boolean
}
export type PropertiesType = {
    title: string
    description: string
    completed: boolean
    status: TypeStatusTask
    priority: PriorityType
    startDate: string
    deadline: string
}
type TypeIsAuth = {
        id: number
        email:string
        login: string
}

export const getIsAuth = {
    login:(email: string,password:string,rememberMe:boolean)=>{
        return instance.post<TypeResponseDeleteAndUpdate<{userId: number}>>('/auth/login',{email,password,rememberMe}).then(response => {
            return  response.data
        })
    },
    getInitialApp :()=>{
        return instance.get<TypeResponseDeleteAndUpdate<TypeIsAuth>>('/auth/me').then(response=>{
            return  response.data
        })
    },
    logout :()=>{
        return instance.delete<TypeResponseDeleteAndUpdate>('/auth/login').then(response => {
            return response.data
        })

    }
}
const GetApi = {
    getTodoLists: () => {
        return instance.get<Array<TypeTodolist>>('todo-lists').then(response => {
            return response.data
        })
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
    reorderTodolist: (todolistId: string, putAfterItemId: string) => {
        return instance.put<TypeResponseDeleteAndUpdate>(`/todo-lists/${todolistId}/reorder`, {putAfterItemId})
    },
    getTasks: (todolistId: string) => {
        return instance.get<TypeResponseTask>(`todo-lists/${todolistId}/tasks?count=10&page=1`)
    },
    createTask: (todolistId: string, title: string) => {
        return instance.post<TypeResponseDeleteAndUpdate<{ item: TypeTaskItems }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask: (todolistId: string, taskId: string) => {
        return instance.delete<TypeResponseDeleteAndUpdate>(`/todo-lists/${todolistId}/tasks/${taskId}`,)
    },
    updateTask: (todolistId: string, taskId: string, model: PropertiesType) => {
        return instance.put<TypeResponseDeleteAndUpdate<{ item: TypeTaskItems }>>(`/todo-lists/${todolistId}/tasks/${taskId}`,

            model
        )
    },
    reorderTask: (todolistId: string, taskId: string, putAfterItemId: string) => {
        return instance.put<TypeResponseDeleteAndUpdate<TypeData>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {
            putAfterItemId,
        })
    }
}
export default GetApi;