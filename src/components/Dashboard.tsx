import * as React from 'react';
import { Component } from 'react';
import ProductsComponent from './products.component';

export class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <section className="container-fluid">
                    <ProductsComponent />
                </section>
            </React.Fragment>
        );
    }
}
