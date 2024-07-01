import { tesloApi } from "@/api/tesloApi";
import type { Product } from "../interfaces/product.interface";

export const createUpdateProductAction = async (product: Partial<Product>) => {
    const productId = product.id;

    const newImages = await uploadImage(product.images ?? []);
    product.images = newImages;
    const cleanProduct = cleanProductForUpdate(product);
    if (productId && productId != '') {
        return await updateProduct(productId, cleanProduct);
    }
    //Crear
    return await createProduct(cleanProduct);
}


const updateProduct = async (productId: string, product: Partial<Product>) => {
    try {
        const { data } = await tesloApi.patch<Product>(`/products/${productId}`, product);
        return data;

    } catch (e) {
        console.log(e);
        throw new Error('Error updating product');
    }



}

const createProduct = async (product: Partial<Product>) => {
    try {
        const { data } = await tesloApi.post<Product>(`/products`, product);
        return data;

    } catch (e) {
        console.log(e);
        throw new Error('Error creating product');
    }

}

const uploadImage = async (images: (File | string)[]) => {


    const filesToUpload = images.filter((image) => image instanceof File) as File[];
    const currentImages = images.filter((image) => typeof image === 'string') as string[];

    const uploadPromise = filesToUpload.map(async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const { data } = await tesloApi.post<{ secureUrl: string }>('/files/product', formData);
            return data.secureUrl;
        } catch (e) {
            console.log(e);
            throw new Error('Error uploading images');
        }
    });
    const uploadImages = await Promise.all(uploadPromise);
    return [...currentImages, ...uploadImages]
}

const cleanProductForUpdate = (product: Partial<Product>) => {
    const images: string[] = product.images?.map((image) => {
        if (image.startsWith('http')) {
            const imageName = image.split('/').pop();
            return imageName ? image : '';
        }
        return image;
    }) ?? [];

    delete product.id;
    delete product.user;
    product.images = images;
    return product;

}
