import { ProductType } from '../../types'; 

export const productsReducer = (state: ProductType[] = [], action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return action.payload;
        default: 
            return state;
    }
}
