import { dateFormat } from '../utils';

export class InvoiceFactory {

    /**
     * Create Invoice entity
     * @param data invoiceta from api
     * @returns {Invoice}
     */
    static create(data) {
        const invoice = {
            ...data,
            remindDate: dateFormat(new Date(data.remindDate))
        };
        return invoice
    }
}
