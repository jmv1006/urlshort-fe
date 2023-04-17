<script setup lang="ts">
import { defineProps, reactive } from 'vue'

const props = defineProps<{
    successful: boolean,
    shortenedUrl: string
}>();

const state = reactive({
    copied: false
})

const copyURL = () => {
    navigator.clipboard.writeText(props.shortenedUrl);
    state.copied = true;
}

</script>

<template>
    <div v-if="successful" class="shortenedURLContainer">
        <span>{{ shortenedUrl }}</span>
        <button @click="copyURL">{{ state.copied ? "Copied" : "Copy" }}</button>
    </div>
    <div v-if="!successful">Please enter a valid URL!</div>
</template>

<style scoped>
    .shortenedURLContainer {
        display: flex;
        gap: .5rem;
    }
</style>
