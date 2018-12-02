import { ProductsStateType } from '../../types'; 
import { PRODUCT_PURCHASE } from '../actions';

const defaultState: ProductsStateType = {
    availableProducts: [],
    userProducts: []
}

export const productsReducer = (state: ProductsStateType = defaultState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            console.log(action.payload);
            return action.payload;
        case PRODUCT_PURCHASE:
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
}
