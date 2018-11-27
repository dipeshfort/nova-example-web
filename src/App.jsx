import React from 'react';
import {
    Route, Switch
} from 'react-router-dom';

import { Header } from './components/Header';

// Components
import { ProtectedRoute } from './protected-route';
import { ReminderDetails } from './components/ReminderDetails';
import { ReminderCreate } from './components/ReminderCreate';
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
                    component = { ReminderCreate }
                />
                <ProtectedRoute 
                    path='/invoices/:id'
                    component = { ReminderDetails }
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