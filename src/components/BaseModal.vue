<script setup lang="ts">
import AccountSettings from './AccountSettings.vue';
import LogIn from './LogIn.vue';
import SignUp from './SignUp.vue';

    const props = defineProps<{
        toggleModal: (type: string) => void,
        type: string,
        logInUser: (username: string, id: string) => void
    }>();

</script>

<template>
  <div class="modalContainer">
    <div class="modalContent">
      <button @click="props.toggleModal('')" class="closeButton">X</button>
      <LogIn :toggle-modal="props.toggleModal" :log-in-user="logInUser" v-if="props.type == 'sign-in'" />
      <AccountSettings v-else-if="props.type == 'settings'" :toggle-modal="props.toggleModal"/>
      <SignUp v-else :toggle-modal="props.toggleModal" :log-in-user="logInUser"/>
    </div>
  </div>
</template>

<style scoped>
  .modalContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
  }
  .closeButton {
    width: 2rem;
    height: 1.5rem;
    margin-top: .5rem;
    margin-right: .5rem;
    border: none;
    background-color: transparent;
    color: white;
  }

  .closeButton:hover {
    width: 2rem;
    height: 1.5rem;
    margin-top: .5rem;
    margin-right: .5rem;
    border: none;
    background-color: transparent;
    color: white;
    text-decoration: underline;
    cursor: pointer;
  }

  .modalContent {
    width: 30rem;
    background-color: #3b3a3a;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: end;
    border-radius: 0.5rem;
  }
</style>
