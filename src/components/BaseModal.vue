<script setup lang="ts">
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
    margin-top: .5rem;
    margin-right: .5rem;
  }

  .modalContent {
    color: black;
    width: 30rem;
    height: 25rem;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: end;
  }
</style>
