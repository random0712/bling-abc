import { IProduct } from "src/app/services/bling/product/product.model"

export interface IQuantityListItem {
    lastOrderDate: string,
    code: string, 
    quantity: number,
    totalValue: number
}

export interface IItemData {
    quantity: number,
    totalValue: number,
    product: IProduct | undefined,
    lastOrderDate: string
}