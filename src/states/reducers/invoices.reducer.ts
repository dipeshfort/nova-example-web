
export const invoicesReducer = (state: any[] = [], action: { type: string, payload: any}) => {
    switch (action.type) {
        case 'RECEIVE_REMINDERS':
            return action.payload;
        case 'ADD_REMINDER':
            state.push(action.payload);
            return state;
        case 'UPDATE_REMINDER':
            return update(state, action.payload);
        case 'REMOVE_REMINDER':
            const removeId = action.payload;
            return state.filter((r) => r.id !== removeId);
    }
    return state;
}

function update(invoices: any[], updatedInvoice: any) {
    return invoices.map((invoice) => {
        if (invoice.id !== updatedInvoice.id) {
            return invoice;
        }

        return Object.assign({}, invoice, updatedInvoice);
    })
}
