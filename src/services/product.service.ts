import { ProductType } from "../types";

declare const SERVICE_PRODUCTS: string;

const productsEndpoint = `${SERVICE_PRODUCTS}/products`;

export class ProductsService {

    static async fetchProducts(): Promise<ProductType[]> {
        const resp = await fetch(productsEndpoint, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
        }).then((resp) => {
            return resp.json()
        });
        
        return resp as ProductType[];
    }
}
