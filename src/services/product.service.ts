import {
    User,
    ProductType,
    UserProductType,
    ProductsStateType
} from "../types";

declare const SERVICE_PRODUCTS: string;
const productsEndpoint = `${SERVICE_PRODUCTS}/products`;
const userProductsEndpoint = `${SERVICE_PRODUCTS}/user-products`;
const purchaseApiEndpoint = `${SERVICE_PRODUCTS}/user-products/purchase`;

export class ProductsService {

    static async fetchAllProducts(user: User): Promise<ProductsStateType> {
        let userProducts: UserProductType[] = [];
        let availableProducts: ProductType[] = [];

        if (user.role === 'ADMIN') {
            return {
                userProducts,
                availableProducts,
            };
        }

        try {
            userProducts = await this.fetchUserProducts(user.token);
            const userProductIdIndexed: any = userProducts.reduce((acc, cur: UserProductType) => {
                if (!acc[cur.product.id]) {
                    acc[cur.product.id] = true;
                }
                return acc;
            }, {});
            const products = await this.fetchProducts();
            availableProducts = products.filter(({id}: ProductType) => !userProductIdIndexed.hasOwnProperty(id));
        } catch(err) {
            console.log("ERRORHERE", err);
        }
        return {
            userProducts,
            availableProducts
        }
    }

    static async fetchUserProducts(token: string): Promise<UserProductType[]> {
        const resp = await fetch(userProductsEndpoint, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`
            },
        }).then(async (resp) => {
            const body = await resp.json();
            return {
                status: resp.status,
                body
            };
        });

        if (resp.status !== 200) {
            throw new Error("Error fetching user products" + JSON.stringify(resp.body));
        }

        const userProducts: UserProductType[] = resp.body.map((apiData: any) => {
            return {
                purchased: new Date(apiData.purchased),
                product: apiData.product as ProductType,
            }
        });
        return userProducts;
    }

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

    static async purchaseProduct(user: User, productId: number): Promise<any> {
        const resp = await fetch(`${purchaseApiEndpoint}?product_id=${productId}`, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${user.token}`
            },
        }).then((resp) => {
            return resp.json()
        });
        
        console.log("PURCHASE", resp);
    }
}
