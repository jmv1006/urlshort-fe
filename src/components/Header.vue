<script setup lang="ts">
import { defineProps } from 'vue';
import UserInterface from '../Config/UserInterface';

const props = defineProps<{ toggleModal: () => void, user: UserInterface | null }>();

</script>

<template>
  <div class="header">
    <button class="signInButton" v-if="!user" @click="props.toggleModal">Sign In</button>
    <div v-if="user">Signed In</div>
  </div>
</template>

<style scoped>
    .header {
        width: 100%;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: end;
    }

    .signInButton {
        margin-right: 1rem;
    }
</style>
