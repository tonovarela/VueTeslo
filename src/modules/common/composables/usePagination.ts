import { getProductsAction } from "@/modules/products/actions";
import { useQueryClient, useQuery } from "@tanstack/vue-query";
import { ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";

export const usePagination = () => {

    const route = useRoute();
    const page = ref(route.query.page ? Number(route.query.page) : 1);


    watch(() => route.query.page, (newPage) => {
        page.value = newPage ? Number(newPage) : 1;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    );



    return {
        page,

    }


}