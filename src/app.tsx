
import * as React from 'React';
import { render } from 'react-dom';
import {
    BrowserRouter
} from 'react-router-dom';
import './styles.css';
import { App } from './app.component';
import { 
    InvoiceService,
    ProductsService
} from './services';

// ==========================
// ======== REDUX ===========
// ==========================
import {
    Provider
} from 'react-redux';
import {
    createStore,
    applyMiddleware
} from 'redux';

import {
    allReducers
} from './states/reducers/all-reducers';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import {
    fetchUser,
} from './states/actions';

const store = createStore(allReducers, applyMiddleware(
    thunkMiddleware,
    createLogger()
));

const thunkAwareDispatch: any = store.dispatch;
const userToken: string | null = localStorage.getItem('user');
if (userToken) {
    thunkAwareDispatch(fetchUser(userToken));
}
// ======== /REDUX ===========

render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.querySelector('#root'));
