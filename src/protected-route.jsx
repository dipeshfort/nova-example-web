import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export class _ProtectedRoute extends Component {
    render() {
        const { component: Component, user, ...props } = this.props
        return (
            <Route
                {...props}
                render={props => (
                    user ?
                        <Component {...props} /> :
                        <Redirect to='/login' />
                )}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export const ProtectedRoute = connect(mapStateToProps, null)(_ProtectedRoute);