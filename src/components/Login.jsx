import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserService } from "../services/user.service";
import { InvoiceService } from "../services/invoice.service";

class _Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            credentials: {
                email: "",
                password: ""
            },
            error: null
        }
    }

    login = (event) => {
        event.preventDefault();
        UserService.login(this.state.credentials).then(async (resp) => {
            if (resp.token) {
                const profile = await UserService.fetchUser(resp.token);
                const user = {
                    ...profile, 
                    token: resp.token
                };

                this.props.setUser(user);
                InvoiceService.fetchInvoices(user).then((invoices) => {
                    this.props.setInvoices(invoices);
                });
                this.props.history.push('/');
            } else if (resp.code && resp.message) {
                console.error("ERROR Login", resp);
                this.setState({
                    error: 'Login failed'
                });
            } else {
                console.error("ERROR Unknown response", resp);
                this.setState({
                    error: 'Login failed'
                });
            }
        }).catch((err) => {
            console.error(err);
            this.setState({
                error: 'Login failed'
            });
        });
    }

    handleChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        this.setState((prevState) => {
            const state = prevState;
            state.credentials[field] = value;
            return state;
        });
    }

    render() {
        const { error } = this.state;
        return (
            <section className="container col-md-6">
                    { error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                ) }
                <form onSubmit={this.login}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="email">Email</label>
                        <div className="col-sm-10">
                            <input
                                className="form-control"
                                id="email"
                                name="email"
                                onChange={this.handleChange}
                                placeholder="Enter email"
                                required
                                type="email"
                                value={this.state.credentials.email}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="password">Password</label>
                        <div className="col-sm-10">
                            <input
                                className="form-control"
                                id="password"
                                name="password"
                                onChange={this.handleChange}
                                placeholder="Enter password"
                                required
                                type="password"
                                value={this.state.credentials.password}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <button type="submit" className="btn btn-success btn-block">Login</button>
                        </div>
                        <div className="col-6">
                            <Link to="/" className="btn btn-outline-secondary btn-block">Back</Link>
                        </div>
                    </div>
                </form>
            </section>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => {
            dispatch({
                type: 'SET_USER',
                payload: user
            });
        },
        setInvoices: (invoices) => {
            dispatch({
                type: 'RECEIVE_REMINDERS',
                payload: invoices
            })
        }
    }
}
export const Login = connect(null, mapDispatchToProps)(_Login);
