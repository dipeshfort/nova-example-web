import { InvoiceFactory } from "../factories/invoice.factory";

const SERVICE_INVOICE_API = `${SERVICE_INVOICE}/invoices`;

export class InvoiceService {
    static async fetchInvoices(user) {
        if (user.role === "ADMIN") {
            return await this.fetchAll(user.token);
        } else {
            return await this.fetchUserInvoice(user.token);
        }
    }

    static async fetchUserInvoice(token) {
        const api = `${ SERVICE_INVOICE }/user-invoices`
        const invoice = await fetch(api, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`
            },
        }).then((resp) => {
            return resp.json()
        });

        this.invoice = invoice.map((invoiceData) => {
            return InvoiceFactory.create(invoiceData);
        });
        return Promise.resolve(this.invoice);
    }

    static async fetchAll(token) {
        const api = `${SERVICE_INVOICE}/invoices`
        const invoice = await fetch(api, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`
            },
        }).then((resp) => {
            return resp.json()
        });

        this.invoice = invoice.map((invoiceData) => {
            return InvoiceFactory.create(invoiceData);
        });
        return Promise.resolve(this.invoice);
    }

    static async create(token, invoice) {
        const data = {
            ...invoice,
            status: "OPEN",
            created: new Date()
        };
        const api = SERVICE_INVOICE_API;
        console.info('Creating invoice', {
            token,
            api,
            invoice
        });
        const resp = await fetch(api, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        const invoiceData = await resp.json();
        return InvoiceFactory.create(invoiceData);
    }

    static async update(invoiceId, updateData) {
        const data = {
            ...updateData,
        };
        const api = `${SERVICE_INVOICE_API}/${invoiceId}`;
        console.info(`Updating ${api}`, updateData);
        const resp = await fetch(api, {
            method: 'PATCH',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data)
        });
        const invoiceData = await resp.json();
        return InvoiceFactory.create(invoiceData);
    }
    static async delete(invoiceId) {
        const api = `${SERVICE_INVOICE_API}/${invoiceId}`;
        console.info(`Deleting ${api}`);
        const resp = await fetch(api, {
            method: 'DELETE',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        });
        return resp.status === 204;
    }
}
