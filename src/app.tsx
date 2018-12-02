
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
import { ProductType } from './types';

const store = createStore(allReducers, applyMiddleware(
    thunkMiddleware
));

try {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
        store.dispatch({
            type: 'SET_USER',
            payload: user
        });
        InvoiceService.fetchInvoices(user).then((invoices: any[]) => {
            store.dispatch({
                type: 'RECEIVE_REMINDERS',
                payload: invoices
            })
        });
    }
} catch(err) {
    console.log("ERROR parsing user", err);
    // ignore
}

ProductsService.fetchProducts()
    .then((products: ProductType[]) => {
        store.dispatch({
            type: 'SET_PRODUCTS',
            payload: products
        });
    });

// ======== /REDUX ===========

render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.querySelector('#root'));
