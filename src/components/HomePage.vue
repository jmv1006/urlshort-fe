<script setup lang="ts">
import InputContainer from './InputContainer.vue';
import BaseModal from './BaseModal.vue';
import Footer from './Footer.vue';
import Header from './Header.vue';
import { reactive } from 'vue';
import UserInterface from '../Config/UserInterface';

interface AppState {
  user: UserInterface | null,
  modalToggled: boolean,
  modalType: string
}

const appState: AppState = reactive( { user: null, modalToggled: false, modalType: "sign-in"} )

const toggleModal = (type: string) => {
  appState.modalToggled = !appState.modalToggled
  appState.modalType = type
}

const logInUser = (username: string, id: string) => {
  appState.user = {username, id};
}

</script>

<template>
  <Header :toggle-modal="toggleModal" :user="appState.user"/>
  <div class="homeContainer">
    <div id="mainTitle">url-short</div>
    <InputContainer />
  </div>
  <BaseModal :toggle-modal="toggleModal" :log-in-user="logInUser" :type="appState.modalType" v-if="appState.modalToggled" />
  <Footer />
</template>

<style scoped>
  .homeContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #mainTitle {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
</style>
