import React from 'react';
import {Meta, Story} from "@storybook/react/types-6-0";
import AppWithRedux from "./AppWithRedux";
import {HocWithProviderDecorator} from "../../.storybook/HocWithProviderDecorator";


export default {
    title: 'App',
    component: AppWithRedux,
    decorators:[HocWithProviderDecorator]
} as Meta;

const Template: Story<any> = () => {
    return <AppWithRedux />
}


export const test1 = Template.bind({});
