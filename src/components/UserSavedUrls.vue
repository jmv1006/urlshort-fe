<script setup lang="ts">
import URLSave from '../Config/Interfaces/UrlSave';
import useStore from '../store/store';

const store = useStore();

const user = store.getUser();

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

fetchUserSaves();
</script>

<template>
  <div class="savedUrlsContainer">
    <h3>Saved Links: </h3>
    <li v-for="urlSave in store.getURLSaves()" class="savedURLWrapper">
        <div>{{ "url-short.dev/" + urlSave.urlInfo.url }}</div>
        <div class="redirectText">- {{ urlSave.urlInfo.redirect }}</div>
        <button class="deleteButton" @click="deleteURLSave(urlSave.id)">Delete</button>
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
  margin-left: 2rem;
  margin-bottom: 1rem;
}

.deleteButton {
  width: 5rem;
  background-color: #7dcafa;
  border: none;
  padding: 0.4rem;
}

.deleteButton:hover {
  background-color: #7dcafa;
  border: none;
  padding: 0.4rem;
  text-decoration: underline;
  cursor: pointer;
}

</style>
