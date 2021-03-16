import React from 'react';
import {Meta, Story} from "@storybook/react/types-6-0";
import EditSpan, {TypeEditSpan} from "./editSpan";
import {action} from "@storybook/addon-actions";


export default {
    title: 'EditSpan',
    component: EditSpan,
} as Meta;
const changeTaskTitleCallBack  = action('Test Change span')
const baseArgs ={
    changeTaskTitle:changeTaskTitleCallBack
}


const Template: Story<TypeEditSpan> = (args) => <EditSpan {...args}/>



export const TaskExample = Template.bind({});
TaskExample.args = {
    ...baseArgs,
     title:"Test",

}
