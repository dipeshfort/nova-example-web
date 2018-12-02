export const PRODUCT_PURCHASE = 'PRODUCT_PURCHASE';

export const purchaseProductAction = (dispatch) => (productId) => {
    console.log("Action: purchaseProduct", {
        productId
    });

    dispatch({
        type: PRODUCT_PURCHASE,
        payload: {
            productId,
        }
    })
};
