import { defineComponent, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useQuery, useMutation } from '@tanstack/vue-query';
import { useFieldArray, useForm } from 'vee-validate';

import CustomInput from '@/modules/common/components/CustomInput.vue';
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue';
import { getProductById } from '@/modules/products/actions/get-product-by-id.action';
import { createUpdateProductAction } from '@/modules/products/actions';
import { useToast } from 'vue-toastification';

import * as yup from 'yup';

const validationSchema = yup.object({
    title: yup.string().required('Este campo es super importante').min(3, 'Mínimo de 3 letras!!!'),
    slug: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().typeError("Debe de ser númerico").required(),
    stock: yup.number().typeError("Debe de ser numerico").required().min(1, "Debe ser mayor a 0"),
    gender: yup.string().required().oneOf(['men', 'women', 'kid']),
});



export default defineComponent({
    components: {
        CustomInput,
        CustomTextArea,
    },
    props: {
        productId: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const router = useRouter();
        const toast = useToast();

        const { data: product, refetch, isError, isLoading, } = useQuery({ queryKey: ['product', props.productId], queryFn: () => getProductById(props.productId), retry: false, });
        const { values, defineField, errors, handleSubmit, resetForm, meta } = useForm({
            validationSchema,
            // initialValues: product.value,
        });

        const [title, titleAttrs] = defineField('title');
        const [slug, slugAttrs] = defineField('slug');
        const [description, descriptionAttrs] = defineField('description');
        const [price, priceAttrs] = defineField('price');
        const [stock, stockAttrs] = defineField('stock');
        const [gender, genderAttrs] = defineField('gender');



        const { fields: sizes, remove: removeSize, push: pushSize } = useFieldArray<string>('sizes');
        const { fields: images } = useFieldArray<string>('images');
        const { mutate, isSuccess: isUpdateSuccess, isPending: isUpdatingProduct, data: updatedProduct } = useMutation({ mutationFn: createUpdateProductAction });
        const imageFiles = ref<File[]>([]);
        const onSubmit = handleSubmit((values) => {
            const product = {
                ...values,
                images: [...values.images, ...imageFiles.value],

            };

            mutate(product);
        });

        const toggleSize = (size: string) => {
            const currentSizes = sizes.value.map((s) => s.value);
            const hasSize = currentSizes.includes(size);

            if (hasSize) {
                removeSize(currentSizes.indexOf(size));
            } else {
                pushSize(size);
            }
        };

        const onFilesChange = (event: Event) => {
            const fileInput = event.target as HTMLInputElement;
            const filesList = fileInput.files;
            if (!filesList) return;
            if (filesList.length === 0) return;

            for (const imageFile of filesList) {
                imageFiles.value.push(imageFile);
            }
        }

        watchEffect(() => {
            if (isError.value && !isLoading.value) {
                router.replace('/admin/products');
                return;
            }
        });

        watch(
            product,
            () => {
                if (!product.value) return;
                resetForm({
                    values: product.value,
                });
            },
            {
                deep: true,
                immediate: true,
            },
        );
        watch(() => props.productId, () => {
            refetch()
        });


        watch(isUpdateSuccess, (value) => {
            if (!value) { return; }
            toast.success('Producto actualizado correctamente');
            router.replace(`/admin/product/${updatedProduct.value!.id}`);

            resetForm({
                values: updatedProduct.value,
            });
            imageFiles.value = [];
        }
        )




        return {
            // Properties
            values,
            errors,
            meta,
            imageFiles,
            title,
            titleAttrs,
            slug,
            slugAttrs,
            description,
            descriptionAttrs,
            price,
            priceAttrs,
            stock,
            stockAttrs,
            gender,
            genderAttrs,

            //sizes,
            images,


            isUpdatingProduct,


            // Getters
            allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

            // Actions
            onSubmit,
            toggleSize,
            onFilesChange,

            hasSize: (size: string) => {
                const currentSizes = sizes.value.map((s) => s.value);
                return currentSizes.includes(size);
            },
            temporalUrl: (file: File) => URL.createObjectURL(file),
        };
    },
});