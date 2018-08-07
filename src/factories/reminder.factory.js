import { dateFormat } from '../utils';

export class ReminderFactory {

    /**
     * Create Reminder entity
     * @param data reminder data from api
     * @returns {Reminder}
     */
    static create(data) {
        const reminder = {
            ...data,
            remindDate: dateFormat(new Date(data.remindDate))
        };
        return reminder;
    }
}