import { getProductById } from "@/modules/products/actions/get-product-by-id.action";
import { useQuery } from "@tanstack/vue-query";
import { defineComponent, watchEffect } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    props: {
        productId: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const router = useRouter();
        const { data: product, isError, isLoading } = useQuery({
            queryKey: ["product", props.productId],
            queryFn: () => getProductById(props.productId),
            retry: false
        });
        watchEffect(() => {
            if (isError.value && !isLoading.value) {
                router.replace({ name: 'products' });
            }
        });


        return {
            product,
            allSizes: ["XS", "S", "M", "L", "XL", "XXL"]
        }
    }

});