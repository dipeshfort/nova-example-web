
declare const SERVICE_USER: string;

export class UserService {
    static async create(userdata: any) {
        const api = `${SERVICE_USER}/auth/signup`;
        console.info(`Creating user ${api}`);
        const resp = await fetch(api, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(userdata)
        })
        const user = await resp.json();
        return user;
    }

    static async login(credentials: any) {
        const api = `${SERVICE_USER}/auth/login`;
        console.info(`Fetching user token ${api}`);
        const resp = await fetch(api, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(credentials)
        })
        return await resp.json();
    }

    static async fetchUser(token: string) {
        const api = `${SERVICE_USER}/auth/profile`;
        console.info('Fetching user profile', {
            api,
            token,
        });
        const resp = await fetch(api, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`
            }
        });
        const body = await resp.json();
        return {
            status: resp.status,
            body,
        };
    }

    static async fetchUsers(token: string) {
        const api = `${SERVICE_USER}/users`;
        console.info('Fetching all users', {
            api,
            token,
        });
        const resp = await fetch(api, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`
            }
        })
        const users = await resp.json();
        return users.filter((user: any) => user.role !== 'ADMIN');
        
    }

}
