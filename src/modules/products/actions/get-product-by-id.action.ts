import { tesloApi } from "@/api/tesloApi";
import { getProductImageAction } from "./get-products.action";
import type { Product } from "../interfaces/product.interface";

export const getProductById = async (id: string): Promise<Product> => {
    if (id == "create") {
        return {
            id: "",
            title: "",
            slug: "",
            description: "",
            images: [],
            sizes: [],
            tags: [],
            gender: '' as any,
            price: 0,
            stock: 0,
            user: {} as any,
        }

    }
    try {
        const { data } = await tesloApi.get(`/products/${id}`)
        return { ...data, images: data.images.map(getProductImageAction) }
    } catch (error) {

        throw new Error("Error while fetching product")
    }
}
