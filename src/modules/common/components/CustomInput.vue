<template>
    <label :for="label" class="form-label capitalize font-bold">{{ label }}</label>
    <div>
        <input :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value ?? '')"
            @blur="$emit('blur')" :class="['form-control', { 'border-red-500': error }]" :type="type" :id="label" />
        <span v-if="error">
            <p class="text-red-400 text-xs italic">{{ error }}</p>
        </span>
    </div>

</template>

<script setup lang="ts">
interface Props {
    modelValue?: string | number;
    error?: string;
    label: string;
    type?: 'text' | 'number' | 'password';
}

withDefaults(defineProps<Props>(), {
    type: 'text',
    label: 'id'

});

defineEmits(['update:modelValue', 'blur']);
</script>


<style scoped>
.form-control {
    @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>