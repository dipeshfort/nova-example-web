import { ReminderFactory } from "../factories/reminder.factory";

//const SERVICE_REMINDER_API = 'http://localhost:5001/reminders';

export class ReminderService {
    static async fetchAll() {
        const reminders = await fetch(SERVICE_REMINDER_API).then((resp) => {
            return resp.json()
        });

        this.reminders = reminders.map((reminderApiData) => {
            return ReminderFactory.create(reminderApiData);
        });
        return Promise.resolve(this.reminders);
    }

    static async create(reminderData) {
        const data = {
            ...reminderData,
            status: "OPEN",
            created: new Date()
        };
        const api = SERVICE_REMINDER_API;
        console.info(`Creating reminder ${api}`);
        const resp = await fetch(api, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
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
        const api = `${SERVICE_REMINDER_API}/${reminderId}`;
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
        const api = `${SERVICE_REMINDER_API}/${reminderId}`;
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
