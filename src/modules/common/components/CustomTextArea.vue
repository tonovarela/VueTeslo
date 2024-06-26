<template>
    <label :for="label" class="form-label capitalize font-bold">{{ label }}</label>
    <div>

        <textarea :value="modelValue"
            class="shadow h-32 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement)?.value ?? '')"
            @blur="$emit('blur')" :class="['form-control', { 'border-red-500': error }]" :id="label">
            </textarea>
        <span v-if="error">
            <p class="text-red-400 text-xs italic">{{ error }}</p>
        </span>
    </div>
</template>



<script setup lang="ts">
interface Props {
    modelValue?: string;
    error?: string;
    label: string;
}
withDefaults(defineProps<Props>(), {
    label: 'id'
});
defineEmits(['update:modelValue', 'blur']);
</script>

<style scoped>
.form-control {
    @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>