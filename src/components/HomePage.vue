<script setup lang="ts">
import InputContainer from './InputContainer.vue';
import LogInModal from './LogInModal.vue';
import Footer from './Footer.vue';
import Header from './Header.vue';
import { reactive } from 'vue';

const appState = reactive( { user: null, modalToggled: false } )

const toggleModal = () => {
  appState.modalToggled = !appState.modalToggled
}

</script>

<template>
  <Header :toggle-modal="toggleModal" :user="appState.user"/>
  <div class="homeContainer">
    <div id="mainTitle">url-short</div>
    <InputContainer />
  </div>
  <LogInModal :toggle-modal="toggleModal" v-if="appState.modalToggled" />
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
