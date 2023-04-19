<script setup lang="ts">
import { defineProps } from 'vue';
import UserInterface from '../Config/UserInterface';

const props = defineProps<{ toggleModal: (type: string) => void, user: UserInterface | null }>();

</script>

<template>
  <div class="header">
    <button class="baseButton" v-if="!user" @click="props.toggleModal('sign-in')">Sign In</button>
    <button class="baseButton" v-if="!user" @click="props.toggleModal('sign-up')">Sign Up</button>
    <div v-if="user" class="signedInText">Signed In</div>
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

    .baseButton {
        margin-right: 1rem;
    }

    .signedInText {
      margin-right: 1rem;
    }
</style>
