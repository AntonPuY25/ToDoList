import React from 'react';
import {Meta, Story} from "@storybook/react/types-6-0";
import Task, {TypePropsTask} from "./tasks";
import {HocWithProviderDecorator} from "../../.storybook/HocWithProviderDecorator";
import {v1} from "uuid";
import {todolistID1} from "../AppWithRedux";
import {PriorityType, TypeStatusTask} from "../dall/todolists-api";


export default {
    title: 'Task',
    component: Task,
    decorators: [HocWithProviderDecorator]
} as Meta;


const Template: Story<TypePropsTask> = (args) =>{
    return <>
        <Task {...args} task={{description: "",
            title: "Task2" ,
            completed: true,
            status: TypeStatusTask.New,
            priority: PriorityType.Hi,
            startDate: "",
            deadline: "",
            id: v1(),
            todoListId: 'todolist2',
            order: 2,
            addedDate:"",}} todolistId={todolistID1}/>

    </>
}

export const TaskExample = Template.bind({});
