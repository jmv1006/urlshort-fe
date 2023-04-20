<script setup lang="ts">
import URLSave from '../Config/Interfaces/UrlSave';
import useStore from '../store/store';
import { reactive } from 'vue';

const store = useStore();

const user = store.getUser();

const state = reactive({
  copied: new Set()
});

const fetchUserSaves = async () => {
    const res = await fetch(`/api/url/user/${user?.id}`);
    if(res.ok) {
        const resJSON = await res.json();
        store.setURLSaves(resJSON.urlSaves);
    }
}

const deleteURLSave = async (saveId: string) => {
  const res = await fetch(`/api/url/${saveId}`, {
    method: "DELETE",
    headers: {
            'Content-Type': "application/json"
    }
  })

  if(res.ok) {
    // delete from local state
    const updatedUrlSaves = store.getURLSaves().filter((urlSave: URLSave) => urlSave.id !== saveId);
    store.setURLSaves(updatedUrlSaves);
  }
}

const copyURL = (url: string) => {
  navigator.clipboard.writeText("https://url-short.dev/" + url);
  state.copied.add(url);
}

fetchUserSaves();
</script>

<template>
  <div class="savedUrlsContainer">
    <h3>Saved Links:</h3>
    <div v-if="store.getURLSaves().length == 0">You have no URLs saved!</div>
    <li v-for="urlSave in store.getURLSaves()" class="savedURLWrapper">
        <div>{{ "url-short.dev/" + urlSave.urlInfo.url }}</div>
        <div class="redirectText">- {{ urlSave.urlInfo.redirect }}</div>
        <div class="buttonContainer">
          <button class="baseButton" @click="copyURL(urlSave.urlInfo.url)">{{ state.copied.has(urlSave.urlInfo.url) ? "Copied" : "Copy" }}</button>
          <button class="baseButton" @click="deleteURLSave(urlSave.id)">Delete</button>
        </div>
    </li>
  </div>
</template>

<style scoped>
.savedUrlsContainer {
    width: 90%;
    display: flex;
    flex-direction: column;
}

.savedURLWrapper {
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
}

.redirectText {
  width: 85%;
  margin-left: 1rem;
  margin-bottom: 1rem;
}

.buttonContainer {
  display: flex;
  gap: 0.5rem;
}

.baseButton {
  width: 5rem;
  background-color: #7dcafa;
  border: none;
  padding: 0.4rem;
}

.baseButton:hover {
  background-color: #7dcafa;
  border: none;
  padding: 0.4rem;
  text-decoration: underline;
  cursor: pointer;
}

</style>
