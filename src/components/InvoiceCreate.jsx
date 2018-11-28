import React, { Component } from 'react';
import { dateFormat } from '../utils';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { InvoiceService } from "../services/invoice.service";
import { UserService } from '../services/user.service';

class _InvoiceCreate extends Component {
    constructor(props) {
        super(props);
        const todayStr = dateFormat(new Date());
        this.state = {
            minremindDate: todayStr,
            invoice: {
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
        InvoiceService.create(this.props.user.token, this.state.invoice).then((invoice) => {
            this.props.addInvoice(invoice);
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
            state.invoice[field] = value;
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
                        <select name="userId" value={this.state.invoice.userId} className="custom-select" onChange={this.handleChange}>>
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
                            value={this.state.invoice.title}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="remindDate">Due date</label>
                        <input 
                            className="form-control" 
                            min={ this.state.invoice.minremindDate } 
                            name="remindDate" 
                            onChange={this.handleChange } 
                            required
                            type="date" id="remindDate" 
                            value={this.state.invoice.remindDate}
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
                            value={this.state.invoice.amount}
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
                            value={this.state.invoice.comments}
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
       addInvoice: (invoice) => {
            dispatch({
               type: 'ADD_REMINDER',
               payload: invoice
            });
       }
    }
}
export const InvoiceCreate = connect(mapStateToProps, mapDispatchToProps)(_InvoiceCreate);

