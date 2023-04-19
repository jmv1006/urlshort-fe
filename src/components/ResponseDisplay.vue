<script setup lang="ts">
import { defineProps, reactive } from 'vue'
import UserInterface from '../Config/Interfaces/UserInterface';
import BaseURLDBModel from '../Config/Interfaces/BaseURLDBModel';
import useStore from '../store/store';

const store = useStore();

const props = defineProps<{
    successful: boolean,
    urlInfo: BaseURLDBModel | null
    user: UserInterface | null
}>();

const state = reactive({
    copied: false,
    saved: false
})

const copyURL = () => {
    navigator.clipboard.writeText("https://url-short.dev/" + props.urlInfo?.url);
    state.copied = true;
}

const saveUrl = async () => {
    if(props.user) {
        state.saved = true

        const reqBody = {
            userId: props.user.id,
            urlId: props.urlInfo?.id
        }

        const res = await fetch('/api/url/create', {
            method: "POST",
            headers: {
            'Content-Type': "application/json"
            },
            body: JSON.stringify(reqBody)
        });

        if(res.ok) {
            const resJSON = await res.json()
            store.setURLSaves(store.getURLSaves().concat(resJSON.urlSave))
            
        } else {
            console.log(res)
        }
    }
}

</script>

<template>
    <div v-if="successful" class="shortenedURLContainer">
        <span>{{ "https://url-short.dev/" + props.urlInfo?.url }}</span>
        <button @click="copyURL" class="responseDisplayButton">{{ state.copied ? "Copied" : "Copy" }}</button>
        <button v-if="user && !state.saved" @click="saveUrl" class="responseDisplayButton">Save</button>
    </div>
    <div v-if="!successful">Please enter a valid URL!</div>
</template>

<style scoped>
    .shortenedURLContainer {
        margin-top: 0.5rem;
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        align-items: center;
    }

    .responseDisplayButton {
        background-color: #7dcafa;
        border: none;
        padding: 0.4rem;
    }

    .responseDisplayButton:hover {
        text-decoration: underline;
        cursor: pointer;
    }
</style>
