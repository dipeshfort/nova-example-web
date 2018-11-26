import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserService } from "../services/user.service";

class _SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstname: "",
                lastname: "",
                email: "",
                password: ""
            },
            error: null
        }
    }

    save = (event) => {
        event.preventDefault();
        UserService.create(this.state.user).then((user) => {
            this.props.history.push('/login');
        }).catch((err) => {
            console.error(err);
            this.state.set({
                error: err
            })
        });
    }

    handleChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        this.setState((prevState) => {
            const state = prevState;
            state.user[field] = value;
            return state;
        });
    }

    render() {
        return (
            <section className="container col-sm-12 col-md-6">
                <form onSubmit={this.save}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="firstname">Firstname</label>
                        <div className="col-sm-10">
                            <input
                                className="form-control"
                                id="firstname"
                                name="firstname"
                                onChange={this.handleChange}
                                placeholder="Enter firstname"
                                required
                                type="text"
                                value={this.state.user.firstname}
                                />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="lastname">Lastname</label>
                        <div className="col-sm-10">
                            <input
                                className="form-control"
                                id="lastname"
                                name="lastname"
                                onChange={this.handleChange}
                                placeholder="Enter lastname"
                                required
                                type="text"
                                value={this.state.user.lastname}
                            />
                        </div>
                    </div>
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
                                value={this.state.user.email}
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
                                value={this.state.user.password}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <button type="submit" className="btn btn-success btn-block">Signup</button>
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
        }
    }
}
export const SignUp = connect(null, mapDispatchToProps)(_SignUp);
