import React from 'react';
import {Meta, Story} from "@storybook/react/types-6-0";
import Task, {TypePropsTask} from "./tasks";
import {HocWithProviderDecorator} from "../../.storybook/HocWithProviderDecorator";
import {v1} from "uuid";
import {todolistID1} from "../AppWithRedux";


export default {
    title: 'Task',
    component: Task,
    decorators: [HocWithProviderDecorator]
} as Meta;


const Template: Story<TypePropsTask> = (args) =>{
    return <>
        <Task {...args} task={{id: v1(), isDone: false, title: "Test Task"}} todolistId={todolistID1}/>

    </>
}

export const TaskExample = Template.bind({});
