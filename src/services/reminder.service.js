import { ReminderFactory } from "../factories/reminder.factory";

const SERVICE_INVOICE_API = `${SERVICE_INVOICE}/invoices`;

export class ReminderService {
    static async fetchInvoices(user) {
        if (user.role === "ADMIN") {
            return await this.fetchAll(user.token);
        } else {
            return await this.fetchUserInvoice(user.token);
        }
    }

    static async fetchUserInvoice(token) {
        const api = `${ SERVICE_INVOICE }/user-invoices`
        const reminders = await fetch(api, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`
            },
        }).then((resp) => {
            return resp.json()
        });

        this.reminders = reminders.map((reminderApiData) => {
            return ReminderFactory.create(reminderApiData);
        });
        return Promise.resolve(this.reminders);
    }

    static async fetchAll(token) {
        const api = `${SERVICE_INVOICE}/invoices`
        const reminders = await fetch(api, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`
            },
        }).then((resp) => {
            return resp.json()
        });

        this.reminders = reminders.map((reminderApiData) => {
            return ReminderFactory.create(reminderApiData);
        });
        return Promise.resolve(this.reminders);
    }

    static async create(token, reminderData) {
        const data = {
            ...reminderData,
            status: "OPEN",
            created: new Date()
        };
        const api = SERVICE_INVOICE_API;
        console.info('Creating invoice', {
            token,
            api,
            reminderData
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
        const reminderApiData = await resp.json();
        return ReminderFactory.create(reminderApiData);
    }

    static async update(reminderId, reminderData) {
        const data = {
            ...reminderData,
        };
        const api = `${SERVICE_INVOICE_API}/${reminderId}`;
        console.info(`Updating ${api}`, reminderData);
        const resp = await fetch(api, {
            method: 'PATCH',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data)
        });
        const reminderApiData = await resp.json();
        return ReminderFactory.create(reminderApiData);
    }
    static async delete(reminderId) {
        const api = `${SERVICE_INVOICE_API}/${reminderId}`;
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
