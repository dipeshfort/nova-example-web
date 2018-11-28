import { InvoiceFactory } from "../factories/invoice.factory";

declare const SERVICE_INVOICE: string;

const SERVICE_INVOICE_API = `${SERVICE_INVOICE}/invoices`;

export class InvoiceService {
    static async fetchInvoices(user: any) {
        if (user.role === "ADMIN") {
            return await this.fetchAll(user.token);
        } else {
            return await this.fetchUserInvoice(user.token);
        }
    }

    static async fetchUserInvoice(token: string) {
        const api = `${ SERVICE_INVOICE }/user-invoices`
        const resp = await fetch(api, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`
            },
        }).then((resp) => {
            return resp.json()
        });

        const invoices: any = resp.map((invoiceData: any) => {
            return InvoiceFactory.create(invoiceData);
        });
        return Promise.resolve(invoices);
    }

    static async fetchAll(token: string) {
        const api = `${SERVICE_INVOICE}/invoices`
        const resp = await fetch(api, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`
            },
        }).then((resp) => {
            return resp.json()
        });

        const invoices: any = resp.map((invoiceData: any) => {
            return InvoiceFactory.create(invoiceData);
        });
        return Promise.resolve(invoices);
    }

    static async create(token: string, invoice: any) {
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

    static async update(invoiceId: string, updateData: any) {
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
    static async delete(invoiceId: string) {
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
