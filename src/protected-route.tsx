import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

type PropTypes = {
    exact?: any,
    path: string,
    component: React.ComponentClass,
    user: any,
}
export class _ProtectedRoute extends React.Component<PropTypes, {}> {
    render() {
        const { component: Component, user, ...rest } = this.props
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

const mapStateToProps = (state: { user: any }) => {
    return {
        user: state.user
    }
}

export const ProtectedRoute = connect(mapStateToProps, null)(_ProtectedRoute);