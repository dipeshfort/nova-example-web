import { InvoiceService } from '../../services';


export const fetchUserInvoices = (user) => {
    return async function (dispatch) {
        InvoiceService.fetchInvoices(user).then((invoices: any[]) => {
            dispatch({
                type: 'RECEIVE_REMINDERS',
                payload: invoices
            })
        });
    }
}
