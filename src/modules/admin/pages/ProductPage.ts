import { defineComponent, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import { useFieldArray, useForm } from 'vee-validate';
import * as yup from 'yup';


import CustomInput from '@/modules/common/components/CustomInput.vue';
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue';
import { getProductById } from '@/modules/products/actions/get-product-by-id.action';

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

        const {
            data: product,
            isError,
            isLoading,
        } = useQuery({
            queryKey: ['product', props.productId],
            queryFn: () => getProductById(props.productId),
            retry: false,
        });

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
        const { fields: images1 } = useFieldArray<string>('images1');

        const onSubmit = handleSubmit((value) => {
            console.log({ value });
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

        return {
            // Properties
            values,
            errors,
            meta,

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


            // Getters
            allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

            // Actions
            onSubmit,
            toggleSize,

            hasSize: (size: string) => {
                const currentSizes = sizes.value.map((s) => s.value);
                return currentSizes.includes(size);
            },
        };
    },
});