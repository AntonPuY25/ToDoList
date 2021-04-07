import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from './state/store';
import AppWithRedux from "./app/AppWithRedux";
import {BrowserRouter} from "react-router-dom";


ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
        <AppWithRedux/>
    </BrowserRouter>

</Provider>, document.getElementById('root'));

serviceWorker.unregister();