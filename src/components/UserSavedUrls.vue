<script setup lang="ts">
import UserInterface from '../Config/Interfaces/UserInterface';
import useStore from '../store/store';

const props = defineProps<{ user: UserInterface }>();

const store = useStore();

const fetchUserSaves = async () => {
    const res = await fetch(`/api/url/user/${props.user.id}`);
    if(res.ok) {
        const resJSON = await res.json();
        store.setURLSaves(resJSON.urlSaves);
    }
}

fetchUserSaves();
</script>
<template>
  <div class="savedUrlsContainer">
    <h3>Saved Links: </h3>
    <li v-for="urlSave in store.getURLSaves()">
        {{ "url-short.dev/" + urlSave.urlInfo.url }}
    </li>
  </div>
</template>

<style scoped>
.savedUrlsContainer {
    width: 75%;
}
</style>
