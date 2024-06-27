import { tesloApi } from "@/api/tesloApi"
import type { Product } from "../interfaces/product.interface"
import { getProductImageAction } from "./get-products.action"

export const getProductById = async (id: string) => {
    try {
        const { data } = await tesloApi.get(`/products/${id}`)
        return { ...data, images: data.images.map(getProductImageAction) }
    } catch (error) {

        throw new Error("Error while fetching product")
    }
}
