import * as React from 'react';
import { ProductType } from '../types';

export type ProductComponentProps = {
    product: ProductType
};

export const ProductComponent = (props: ProductComponentProps) => {
    const { product } = props; 
    return (
        <section>
            <span className="badge badge-pill badge-info">{product.rating}</span>
            <figure>
                <img src={product.poster} alt={product.title} />
            </figure>
            <h1>{product.title}</h1>
            <button className="btn btn-primary btn-sm btn-block">
                Buy {product.price.toString().replace('.', ',')} €
            </button>
        </section>
    );
}
