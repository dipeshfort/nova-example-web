import React from 'react';
import {
    Route, Switch
} from 'react-router-dom';

import { Header } from './components/Header';

// Components
import { ProtectedRoute } from './protected-route';
import { InvoiceDetails } from './components/InvoiceDetails';
import { InvoiceCreate } from './components/InvoiceCreate';
import { Dashboard } from './components/Dashboard';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';
import { Invoices } from './components/Invoices';

export const App = (props) => {
    return (
        <React.Fragment>
        <main>
            <Header />
            <Switch>
                <Route 
                    exact
                    path='/signup' 
                    component={ SignUp } 
                />
                <Route 
                    exact
                    path='/login' 
                    component={ Login } 
                />
                <ProtectedRoute 
                    exact
                    path='/invoices' 
                    component={ Invoices } 
                />
                <ProtectedRoute 
                    exact
                    path='/invoices/create' 
                    component = { InvoiceCreate }
                />
                <ProtectedRoute 
                    path='/invoices/:id'
                    component = { InvoiceDetails }
                />
                <ProtectedRoute
                    path='/'
                    component={ Dashboard }
                />
            </Switch>
        </main>
        </React.Fragment>
    );
};