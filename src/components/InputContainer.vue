<script setup lang="ts">
import { reactive } from 'vue'

const getShortURL = async () => {
    state.error = false;
    state.urlShortenedSuccess = false;

    const reqBody = {
        "url": state.urlInput,
        "userId": "1234"
    }

    const res = await fetch("/api/create", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(reqBody)
    })

    if (!res.ok) {
        const resJSON = await res.json();
        state.error = true;

    } else {
        const resJSON = await res.json();
        state.urlShortenedSuccess = true;
        state.shortenedURL = resJSON.url;
    }
}

    const state = reactive({
        urlInput: "",
        urlShortenedSuccess: false,
        shortenedURL: "",
        error: false
    })

</script>

<template>
    <div class="InputContainerPageWrapper">
        <div id="infoSubtitle">Please enter a url starting with http or https:</div>
        <form class="inputContainer" @submit.prevent @submit="getShortURL">
            <input v-model="state.urlInput" class="mainForm" placeholder="Enter URL Here">
            <button type="submit">Shorten</button>
        </form>
        <div class="responseContainer">
            <div v-if="state.error">Please enter a valid URL!</div>
            <a v-if="state.urlShortenedSuccess" :href="state.shortenedURL" target="_blank">{{ state.shortenedURL }}</a>
        </div>
    </div>
</template>

<style scoped>
  .inputContainer {
    display: flex;
    gap: 1rem;
  }

  .mainForm {
    width: 25rem;
    height: 2.5rem;
    font-size: 1.5rem;
    font-weight: lighter;
  }

  .responseContainer {
    height: 1.5rem;
  }

  #infoSubtitle {
    width: 25rem;
  }
</style>
