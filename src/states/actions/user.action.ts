import { UserService } from '../../services'
import { User } from '../../types';
import {
    fetchUserProducts,
    fetchUserInvoices
} from '../actions';

export const USER_RECEIVE = 'USER_RECEIVE';
export const USER_LOGOUT = 'USER_LOGOUT';

export function receiveUserAction(user: User) {
    return {
        type: USER_RECEIVE,
        payload: user
    };
}

export function logoutUserAction() {
    return {
        type: USER_LOGOUT
    };
}

export function fetchUser(token: string) {
    return async function (dispatch) {
        const resp = await UserService.fetchUser(token);

        if (resp.status === 200) {
            const user = {
                ...resp.body,
                token
            };
            dispatch(receiveUserAction(user));
            dispatch(fetchUserProducts(user));
            dispatch(fetchUserInvoices(user));
        }
    }
}