import { User } from '../../types';
import { USER_RECEIVE, USER_LOGOUT } from '../actions';

export const userReducer = (state: User | null = null, action: any) => {
    switch (action.type) {
        case USER_RECEIVE:
            localStorage.setItem('user', action.payload.token);
            return action.payload;
        case USER_LOGOUT:
            localStorage.removeItem('user');
            return null;
        default: 
            return state;
    }
}