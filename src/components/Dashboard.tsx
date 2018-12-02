import * as React from 'react';
import { Component } from 'react';
import ProductsComponent from './products.component';

export class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <section className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12" >
                            <h3>Welcome to Nova Shop</h3>
                            <h5>Latest Movies</h5>
                            <ProductsComponent />
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
