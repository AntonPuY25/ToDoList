import React from 'react';
import AddItemForm, {TypeAddItemProps} from "./AddItemForm";
import {Meta, Story} from "@storybook/react/types-6-0";
import {action} from "@storybook/addon-actions";



export default {
    title:'AddItemForm',
    component: AddItemForm,
} as Meta;

const Template: Story<TypeAddItemProps>=(args:TypeAddItemProps)=>{
    return <>
        <AddItemForm {...args}/>
    </>
}

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args={
    addItems:action('Button inside clicked')
}