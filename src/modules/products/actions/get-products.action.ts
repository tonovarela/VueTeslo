import { tesloApi } from "@/api/tesloApi"
import type { Product } from "../interfaces/product.interface"

export const getProductImageAction = (imageName: string) => imageName.includes("http") ? imageName : `${import.meta.env.VITE_TESLO_API_URL}/files/product/${imageName}`;

export const getProductsAction = async (page: number = 1, limit: number = 10) => {
    try {
        const { data } = await tesloApi.get<Product[]>(`/products?limit=${limit}&offset=${page * limit}`)
        return data.map((product) => {
            return { ...product, images: product.images.map(getProductImageAction) }
        });
    } catch (error) {
        
        throw new Error("Error while fetching products")
    }
}

