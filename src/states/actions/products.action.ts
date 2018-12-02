import { ProductsService } from "../../services";
import { ProductsStateType } from '../../types';
import { fetchUserInvoices } from "./invoices.action";

export const PRODUCT_PURCHASE = 'PRODUCT_PURCHASE';


export const purchaseProductAction = (dispatch) => async (user, productId) => {
    const resp = await ProductsService.purchaseProduct(user, productId);
    dispatch(fetchUserProducts(user));
    dispatch(fetchUserInvoices(user));
};

export const fetchUserProducts = (user) => {
    return async function (dispatch) {
        ProductsService.fetchAllProducts(user)
            .then((productsStateType: ProductsStateType) => {
                dispatch({
                    type: 'SET_PRODUCTS',
                    payload: productsStateType
                });
            });
    }
}