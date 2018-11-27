
import React from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter
} from 'react-router-dom';

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
} from './reducers/all-reducers';
import thunkMiddleware from 'redux-thunk';

const store = createStore(allReducers, applyMiddleware(
    thunkMiddleware
));

try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        store.dispatch({
            type: 'SET_USER',
            payload: user
        });
        ReminderService.fetchInvoices(user).then((reminders) => {
            store.dispatch({
                type: 'RECEIVE_REMINDERS',
                payload: reminders
            })
        });
    }
} catch(err) {
    console.log("ERROR parsing user", err);
    // ignore
}


// ======== /REDUX ===========

import './styles.css';
import {
    App
} from './App';
import { ReminderService } from './services/reminder.service';

render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.querySelector('#root'));
