import { defineComponent } from "vue";

export default defineComponent({

    setup() {

        console.log('ProductPage');
        return {
            allSizes: ["XS", "S", "M", "L", "XL", "XXL"]
        }
    }

});