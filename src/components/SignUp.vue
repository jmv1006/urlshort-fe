<script setup lang="ts">
import { reactive } from 'vue';

    const props = defineProps<{
        toggleModal: (type: string) => void
        logInUser: (username: string, id: string) => void
    }>();

    const state = reactive({
      username: "",
      password: ""
    })

</script>

<template>
    <div class="signUpContent">
      Sign Up
    </div>
</template>

<style scoped>
</style>
