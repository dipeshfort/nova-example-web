
export const userReducer = (state = null, action: any) => {
    switch (action.type) {
        case 'SET_USER':
            localStorage.setItem('user', JSON.stringify(action.payload));
            return action.payload;
        case 'LOGOUT':
            localStorage.removeItem('user');
            return null;
        default: 
            return state;
    }
}