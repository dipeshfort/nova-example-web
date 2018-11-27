import React, { Component } from 'react';
import { ReminderList } from './ReminderList';
import { connect } from 'react-redux';
import { ReminderService } from "../services/reminder.service";

// Styles
import './Invoices.css';

class _Invoices extends Component {

    render() {
        return (
            <section className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-xl-5">
                        <ReminderList className="list-opened" title={"Open"} onSelect={this.props.markClosed} reminders={this.props.open} />
                    </div>
                    <div className="col-sm-12 col-md-6 col-xl-5">
                        <ReminderList className="list-closed" title={"Paid"} onSelect={this.props.markOpen} reminders={this.props.closed} />
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        open: state.reminders.filter((reminder) => reminder.status === 'OPEN'),
        closed: state.reminders.filter((reminder) => reminder.status === 'CLOSED')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        markClosed: (reminderId) => {
            ReminderService.update(reminderId, {
                status: 'CLOSED'
            }).then((updatedReminder) => {
                dispatch({
                    type: 'UPDATE_REMINDER',
                    payload: updatedReminder
                });
            });
        },
        markOpen: (reminderId) => {
            ReminderService.update(reminderId, {
                status: 'OPEN'
            }).then((updatedReminder) => {
                dispatch({
                    type: 'UPDATE_REMINDER',
                    payload: updatedReminder
                });
            });
        }
    }
}

export const Invoices = connect(mapStateToProps, mapDispatchToProps)(_Invoices);