import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUserAction } from '../states/actions';

const navStyle = {
    marginBottom: "15px"
};

export const _Header = ({user, logout }) => {
    return (
        <React.Fragment>
            <nav style={navStyle} className="navbar navbar-expand-sm navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Nova Shop</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" ></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        {user && (
                            <React.Fragment>
                                <li className="nav-item">
                                    <NavLink activeClassName="active" className="nav-link" exact to={"/"}>Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName="active" className="nav-link" exact to={"/invoices"}>Invoices</NavLink>
                                </li>
                                {isAdmin(user) && (
                                    <li className="nav-item">
                                        <NavLink activeClassName="active" className="nav-link" to={"/invoices/create"}>Add Invoice</NavLink>
                                    </li>
                                )}
                                <li className="nav-item">

                                </li>
                            </React.Fragment>
                        )}
                        {!user && (
                            <React.Fragment>
                                <li className="nav-item">
                                    <NavLink activeClassName="active" className="nav-link" exact to={"/login"}>Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName="active" className="nav-link" exact to={"/signup"}>Signup</NavLink>
                                </li>
                            </React.Fragment>
                        )}
                    </ul>
                    {user && (
                        <div style={{
                            color: "white",
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <span>
                                <span style={{
                                    fontSize: "0.7em"
                                }}>
                                    {isAdmin(user) ? '(' + user.role.toLowerCase() + ') ' : ''}
                                </span>
                                <span>{user.firstname}</span>
                            </span>
                            <a onClick={() => {
                                logout();
                                window.location.href = '/';
                            }} style={{
                                cursor: "pointer",
                                color: "white",
                                textAlign: "center",
                                fontSize: "0.8em"
                            }}>Logout</a>
                        </div>
                    )}
                </div>
            </nav>
        </React.Fragment>
    );
};

function isAdmin(user) {
    return user && user.role === 'ADMIN';
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logoutUserAction());
        }
    }
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header);

