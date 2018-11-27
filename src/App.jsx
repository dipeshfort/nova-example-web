import React from 'react';
import {
    Route, Switch
} from 'react-router-dom';

import { MainNav } from './components/MainNav';

// Components
import { ProtectedRoute } from './protected-route';
import { ReminderDetails } from './components/ReminderDetails';
import { ReminderCreate } from './components/ReminderCreate';
import { Dashboard } from './components/Dashboard';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';

export const App = (props) => {
    return (
        <React.Fragment>
        <main>
            <MainNav />
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
                <Route 
                    exact
                    path='/invoices/create' 
                    component = { ReminderCreate }
                />
                <Route 
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