import React from 'react';
import AddItemForm, {TypeAddItemProps} from "./AddItemForm";
import {Meta, Story} from "@storybook/react/types-6-0";
import {action} from "@storybook/addon-actions";



export default {
    title:'AddItemForm',
    component: AddItemForm,
} as Meta;
const testFunc = action('TestAction')
const Template: Story<TypeAddItemProps>=(args)=><AddItemForm addItems={testFunc}/>

export const test1 = Template.bind({});
