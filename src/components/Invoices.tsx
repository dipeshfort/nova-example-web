import * as React from 'react';
import { Component } from 'react';
import { InvoiceList } from './InvoiceList';
import { connect } from 'react-redux';
import { InvoiceService } from "../services/invoice.service";

// Styles
import './Invoices.css';

class _Invoices extends Component<any, any> {

    render() {
        return (
            <section className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-xl-5">
                        <InvoiceList className="list-opened" title={"Open"} onSelect={this.props.markClosed} invoices={this.props.open} />
                    </div>
                    <div className="col-sm-12 col-md-6 col-xl-5">
                        <InvoiceList className="list-closed" title={"Archive"} onSelect={this.props.markOpen} invoices={this.props.closed} />
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state: { invoices: any[]}) => {
    return {
        open: state.invoices.filter((invoice) => invoice.status === 'OPEN'),
        closed: state.invoices.filter((invoice) => invoice.status === 'CLOSED')
    }
}

const mapDispatchToProps = (dispatch: (data: any) => void) => {
    return {
        markClosed: (invoice: any) => {
            InvoiceService.update(invoice, {
                status: 'CLOSED'
            }).then((updatedInvoice) => {
                dispatch({
                    type: 'UPDATE_REMINDER',
                    payload: updatedInvoice
                });
            });
        },
        markOpen: (invoice: any) => {
            InvoiceService.update(invoice, {
                status: 'OPEN'
            }).then((updatedInvoice) => {
                dispatch({
                    type: 'UPDATE_REMINDER',
                    payload: updatedInvoice
                });
            });
        }
    }
}

export const Invoices = connect(mapStateToProps, mapDispatchToProps)(_Invoices);