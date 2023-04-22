<script setup lang="ts">
import { defineProps } from 'vue';
import useStore from '../store/store';
import UserInterface from '../Config/Interfaces/UserInterface';

const props = defineProps<{ toggleModal: (type: string) => void, user: UserInterface | null }>();

const store = useStore();

const signOut = () => {
  store.setUser(null);
  store.setURLSaves(null);
}

</script>

<template>
  <div class="header">
    <button class="baseButton" v-if="!user" @click="props.toggleModal('sign-in')">Sign In</button>
    <button class="baseButton" v-if="!user" @click="props.toggleModal('sign-up')">Sign Up</button>
    <div v-if="user" class="signedInText">Signed In</div>``
    <div v-if="user" class="baseButton" @click="signOut">Sign Out</div>
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
      color: black;
        margin-right: 1rem;
        background-color: #7dcafa;
        border: none;
        padding: 0.4rem;
    }

    .baseButton:hover {
        margin-right: 1rem;
        background-color: #7dcafa;
        border: none;
        padding: 0.4rem;
        text-decoration: underline;
        cursor: pointer;
    }

    .signedInText {
      margin-right: 1rem;
    }
</style>
