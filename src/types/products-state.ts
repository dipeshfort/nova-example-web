import { ProductType } from "./product";
import { UserProductType } from "./user-product";

export type ProductsStateType = {
    availableProducts: ProductType[];
    userProducts: UserProductType[];
};