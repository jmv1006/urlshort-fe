<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const getRedirectUrl = async () => {
    const res = await fetch('/api/api/' + `${route.params.redirectId}`);
    if(res.ok) {
        const resJSON = await res.json();
        const redirect = resJSON.url;
        window.location.href = redirect;
    } else {
      router.push("/")
    }
}

getRedirectUrl();
</script>

<template>
</template>

<style scoped>
</style>
