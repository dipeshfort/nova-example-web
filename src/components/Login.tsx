import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { UserService } from "../services/user.service";
import { fetchUser } from '../states/actions';

class _Login extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            credentials: {
                email: "",
                password: ""
            },
            error: null
        }
    }

    login = (event: any) => {
        event.preventDefault();
        UserService.login(this.state.credentials).then(async (resp) => {
            if (resp.token) { 
                this.props.fetchUser(resp.token);
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
            console.log({err});
            this.setState({
                error: 'Service not available. Please try again later'
            });
        });
    }

    handleChange = (event: any) => {
        const field = event.target.name;
        const value = event.target.value;

        this.setState((prevState: any) => {
            const state = prevState;
            state.credentials[field] = value;
            return state;
        });
    }

    render() {
        const { error } = this.state;
        return (
            <React.Fragment>
            {this.props.user && <Redirect to='/' />}
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
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchUser: (token) => {
            dispatch(fetchUser(token));
        },
        setInvoices: (invoices: any) => {
            dispatch({
                type: 'RECEIVE_REMINDERS',
                payload: invoices
            })
        }
    }
}
export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login);
