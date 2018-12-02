import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
    ProductType,
    ProductsStateType,
    UserProductType
} from '../types';
import { ProductComponent } from './product.component';
import './products.component.css';
import { purchaseProductAction } from '../states/actions'

export type ProductsComponentProps = {
    availableProducts: ProductType[];
    userProducts: UserProductType[];
    purchaseProduct: (productId: number) => void;
}

class ProductsComponent extends Component<ProductsComponentProps, any> {
    render() {
        const {
            availableProducts,
            purchaseProduct,
            userProducts,
        } = this.props; 
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-sm-5" >
                        <h5>Your movies</h5>
                        <section className="products-component">
                            {userProducts.map((userProduct) => (
                                <ProductComponent
                                    key={userProduct.product.id}
                                    product={userProduct.product}
                                    purchasedDate={userProduct.purchased}
                                />
                                )) }
                        </section>
                    </div>
                    <div className="col-sm-7" >
                        <h5>Available Movies</h5>
                        <section className="products-component">
                            {availableProducts.map((product) => (
                                <ProductComponent
                                    key={product.id}
                                    product={product}
                                    purchaseProduct={purchaseProduct} />
                                )) }
                        </section>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps({ products }: { products: ProductsStateType}) {
    return {
        availableProducts: products.availableProducts,
        userProducts: products.userProducts,
    }
} 

const mapDispatchToProps = (dispatch: any) => {
    return {
        purchaseProduct: purchaseProductAction(dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsComponent);
