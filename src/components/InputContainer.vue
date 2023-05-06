<script setup lang="ts">
import { reactive } from 'vue'
import ResponseDisplay from './ResponseDisplay.vue';
import UserInterface from '../Config/Interfaces/UserInterface';
import BaseURLDBModel from '../Config/Interfaces/BaseURLDBModel';

defineProps<{
    user: UserInterface | null
}>();

interface IState {
    urlInput: string,
    urlShortenedSuccess: boolean,
    error: boolean,
    urlInfo: BaseURLDBModel | null
}

const getShortURL = async () => {
    state.error = false;
    state.urlShortenedSuccess = false;

    if(state.urlInput.replace(" ", "").length === 0) {
        state.error = true;
        return
    }

    const reqBody = {
        "url": state.urlInput,
    }

    const res = await fetch("/api/core/create", {
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
        state.urlInfo = {
            id: resJSON.urlInfo.id,
            url: resJSON.urlInfo.url,
            redirect: resJSON.urlInfo.redirect
        }
    }
}

    const state: IState = reactive({
        urlInput: "",
        urlShortenedSuccess: false,
        error: false,
        urlInfo: null
    })

</script>

<template>
    <div class="InputContainerPageWrapper">
        <div id="infoSubtitle">Please enter a url starting with http or https:</div>
        <form class="inputContainer" @submit.prevent @submit="getShortURL">
            <input v-model="state.urlInput" class="mainForm" placeholder="Enter URL Here">
            <button type="submit" class="submitButton">Shorten</button>
        </form>
        <div class="responseContainer">
            <ResponseDisplay :url-info="state.urlInfo"  :user="user" v-if="state.error" :successful="false" />
            <ResponseDisplay :url-info="state.urlInfo" :user="user" v-if="state.urlShortenedSuccess" :successful="true" />
        </div>
    </div>
</template>

<style scoped>
  .inputContainer {
    display: flex;
  }

  .mainForm {
    width: 25rem;
    height: 2.5rem;
    font-size: 1.5rem;
    font-weight: lighter;
  }

  .responseContainer {
    height: 1rem;
  }

  #infoSubtitle {
    width: 25rem;
  }

  .submitButton {
    padding: .5rem;
    border: none;
    background-color: #7dcafa;
  }

  .submitButton:hover {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
