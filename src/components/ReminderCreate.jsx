import React, { Component } from 'react';
import { dateFormat } from '../utils';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReminderService } from "../services/reminder.service";
import { UserService } from '../services/user.service';

class _ReminderCreate extends Component {
    constructor(props) {
        super(props);
        const todayStr = dateFormat(new Date());
        this.state = {
            minremindDate: todayStr,
            reminder: {
                title: '',
                comments: '',
                amount: 0,
                remindDate: todayStr,
                userId: '',
            },
            users: [],
            error: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
    }

    async componentDidMount() {
        const users = await UserService.fetchUsers(this.props.user.token);
        this.setState({
            users
        });
    }

    save(event) {
        event.preventDefault();
        ReminderService.create(this.props.user.token, this.state.reminder).then((reminder) => {
            this.props.addReminder(reminder);
            this.props.history.push('/');
        }).catch((err) => {
            console.error("Error creating invoice", err);
            this.setState({
                error: err.message || err.toString() 
            })
        });
    }

    handleChange(event) {
        const field = event.target.name;
        const value = event.target.value;

        this.setState((prevState) => {
            const state = prevState;
            state.reminder[field] = value;
            return state;
        });
    }

    render() {
        const { users } = this.state;
        return (
            <section className="container">
                <form onSubmit={this.save}>
                    <div className="form-group">
                        <label htmlFor="title">User</label>
                        <select name="userId" value={this.state.reminder.userId} className="custom-select" onChange={this.handleChange}>>
                            <option>Select user</option>
                            { users.map((user) => {
                                return <option key={user.id} value={user.id}>{user.firstname} {user.lastname} ({user.email})</option>
                            }) }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Product</label>
                        <input
                            className="form-control"
                            id="title"
                            name="title"
                            onChange={this.handleChange}
                            placeholder="Enter title"
                            required 
                            type="text"
                            value={this.state.reminder.title}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="remindDate">Due date</label>
                        <input 
                            className="form-control" 
                            min={ this.state.reminder.minremindDate } 
                            name="remindDate" 
                            onChange={this.handleChange } 
                            required
                            type="date" id="remindDate" 
                            value={this.state.reminder.remindDate}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Enter amount</label>
                        <input
                            className="form-control"
                            id="amount"
                            name="amount"
                            min="0"
                            onChange={this.handleChange }
                            step="0.25"
                            type="number"
                            value={this.state.reminder.amount}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="comments">Comments</label>
                        <textarea className="form-control"
                            className="form-control"
                            id="comments"
                            name="comments"
                            onChange={this.handleChange}
                            placeholder="Comments" 
                            value={this.state.reminder.comments}
                        />
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <button type="submit" className="btn btn-success btn-block">Add</button>
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

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
       addReminder: (reminder) => {
            dispatch({
               type: 'ADD_REMINDER',
               payload: reminder
            });
       }
    }
}
export const ReminderCreate = connect(mapStateToProps, mapDispatchToProps)(_ReminderCreate);

