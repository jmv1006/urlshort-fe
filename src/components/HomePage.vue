<script setup lang="ts">
import InputContainer from './InputContainer.vue';
import BaseModal from './BaseModal.vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import { reactive } from 'vue';
import UserSavedUrls from './UserSavedUrls.vue';
import useStore from '../store/store';

interface IState {
  modalToggled: boolean,
  modalType: string
}

const state: IState = reactive( { modalToggled: false, modalType: "sign-in"} )
const appState = useStore();

const toggleModal = (type: string) => {
  state.modalToggled = !state.modalToggled
  state.modalType = type
}

const logInUser = (username: string, id: string) => {
  appState.setUser({username, id});
}

</script>

<template>
  <Header :toggle-modal="toggleModal" :user="appState.getUser()"/>
  <div class="homeContainer">
    <div id="mainTitle">url-short</div>
    <InputContainer :user="appState.getUser()"/>
  </div>
  <BaseModal :toggle-modal="toggleModal" :log-in-user="logInUser" :type="state.modalType" v-if="state.modalToggled" />
  <UserSavedUrls v-if="appState.getUser() != null" />
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
