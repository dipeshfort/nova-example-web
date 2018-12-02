import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { User } from './types';

type PropTypes = {
    exact?: any,
    path: string,
    component: React.ComponentClass,
    user: User,
}
export class _ProtectedRoute extends React.Component<PropTypes, {}> {
    render() {
        const { component: Component, user, ...rest } = this.props
        console.log('user', user);
        return (
            <Route
                {...rest}
                render={props => (
                    user ?
                        <Component {...props} /> :
                        <Redirect to='/login' />
                )}
            />
        )
    }
}

const mapStateToProps = ({user}: { user: User }) => {
    return {
        user
    }
}

export const ProtectedRoute = connect(mapStateToProps, null)(_ProtectedRoute);