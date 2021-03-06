import * as React from 'react';
import { ProductType } from '../types';

export type ProductComponentProps = {
    product: ProductType;
    purchasedDate?: Date;
    purchaseProduct?: (productId: number) => void;
};

export const ProductComponent = (props: ProductComponentProps) => {
    const { product, purchasedDate, purchaseProduct } = props; 
    return (
        <section>
            <span className="badge badge-pill badge-info badge-rating">{product.rating}</span>
            <figure>
                <img src={product.poster} alt={product.title} />
            </figure>
            <h1>{product.title}</h1>
            { purchasedDate &&  (
                <span className="badge badge-secondary purchased-tag">
                    Purchased<br/>{purchasedDate.toDateString() }
                </span>
            )}
            {!purchasedDate && (
                <button onClick={() => purchaseProduct && purchaseProduct(product.id) } className="btn btn-primary btn-sm btn-block">
                    Buy {product.price.toString().replace('.', ',')} €
                </button>
            )}
        </section>
    );
}
