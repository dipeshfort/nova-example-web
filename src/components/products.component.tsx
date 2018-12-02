import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ProductType } from '../types';
import { ProductComponent } from './product.component';
import './products.component.css';

export type ProductsComponentProps = {
    products: ProductType[]
}

class ProductsComponent extends Component<ProductsComponentProps, any> {

    render() {
        const { products } = this.props; 
        return (
            <section className="products-component">
                { products.map((product) => (
                    <ProductComponent key={product.id} product={product} />
                    )) }
            </section>
        );
    }
}

function mapStateToProps({products}: { products: ProductType[]}) {
    return {
        products
    }
} 

export default connect(mapStateToProps, null)(ProductsComponent);
