import React, { Component } from 'react';
import { dateFormat } from '../utils';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { InvoiceService } from "../services/invoice.service";

class _InvoiceDetails extends Component {

    constructor(props) {
        super(props);
        const todayStr = dateFormat(new Date());
        this.state = {
            disabled: true,
            minremindDate: todayStr,
            id: null,
            title: '',
            remindDate: '',
            amount: 0,
            comments: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
    }

    fillInvoice(invoice) {
        this.setState({
            disabled: false,
            id: invoice.id,
            title: invoice.title,
            remindDate: invoice.remindDate,
            amount: invoice.amount,
            comments: invoice.comments
        });
    }

    componentDidMount() {
        if (this.props.invoice) {
            this.fillInvoice(this.props.invoice);
        }
    }
    componentWillReceiveProps(props) {
        if (props.invoice) {
            this.fillInvoice(props.invoice);
        }
    } 
    
    save(event) {
        event.preventDefault();
        InvoiceService.update(this.state.id, {
            title: this.state.title,
            remindDate: this.state.remindDate,
            amount: this.state.amount,
            comments: this.state.comments
        }).then((invoice) => {
            this.props.updateInvoice(invoice);
            this.props.history.push('/');
        }).catch((error) => {
            console.error(error);
            this.state.set({
                error
            })
        });
    }

    delete() {
        InvoiceService.delete(this.state.id)
            .then(() => {
                this.props.removeInvoice(this.state.id);
                this.props.history.push('/');
            })
            .catch((err) => {
                console.error(err);
            });
    }

    handleChange(event) {
        const field = event.target.name;
        const value = event.target.value;

        this.setState({
            [field]: value
        });
    }

    render() {
        return (
            <section className="container">
                <form onSubmit={this.save}>
                    <div className="form-group">
                        <label htmlFor="title">Title*</label>
                        <input
                            className="form-control"
                            disabled={this.state.disabled}
                            id="title"
                            name="title"
                            onChange={this.handleChange}
                            placeholder="Enter title"
                            required
                            type="text"
                            value={this.state.title}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="remindDate">Remind date*</label>
                        <input
                            className="form-control"
                            disabled={this.state.disabled}
                            min={this.state.minremindDate}
                            name="remindDate"
                            onChange={this.handleChange}
                            required
                            type="date" id="remindDate"
                            value={this.state.remindDate}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Enter amount</label>
                        <input
                            className="form-control"
                            disabled={this.state.disabled}
                            id="amount"
                            name="amount"
                            min="0"
                            onChange={this.handleChange}
                            step="0.25"
                            type="number"
                            value={this.state.amount}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="comments">Comments</label>
                        <textarea className="form-control"
                            className="form-control"
                            disabled={this.state.disabled}
                            id="comments"
                            name="comments"
                            onChange={this.handleChange}
                            placeholder="Comments"
                            value={this.state.comments}
                        />
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <button disabled={this.state.disabled} type="submit" className="btn btn-success btn-block">Update</button>
                            <button disabled={this.state.disabled} onClick={this.delete} type="button" className="btn btn-danger btn-block">Delete</button>
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

const mapStateToProps = (state, props) => {
    return {
        invoice: state.invoices.find(r => r.id === props.match.params.id)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateInvoice: (invoice) => {
            dispatch({
                type: 'UPDATE_REMINDER',
                payload: invoice
            })
        },
        removeInvoice: (invoiceId) => {
            dispatch({
                type: 'REMOVE_REMINDER',
                payload: invoiceId
            })
        }
    }
}


export const InvoiceDetails = connect(mapStateToProps, mapDispatchToProps)(_InvoiceDetails);