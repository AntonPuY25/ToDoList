import React from 'react';
import {Provider} from "react-redux";
import {store} from "../src/state/store";

export const HocWithProviderDecorator = (story:any)=>{
    return<Provider store={store}> {story()}</Provider>


}