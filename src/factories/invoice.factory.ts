import { dateFormat } from '../utils';

export class InvoiceFactory {

    /**
     * Create Invoice entity
     * @param data invoideData from api
     * @returns {Invoice}
     */
    static create(data: any) {
        const invoice = {
            ...data,
            remindDate: dateFormat(new Date(data.remindDate))
        };
        return invoice
    }
}
