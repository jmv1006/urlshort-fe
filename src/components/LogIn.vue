<script setup lang="ts">
import { reactive } from 'vue';
import UserInterface from '../Config/Interfaces/UserInterface';

    const props = defineProps<{
        toggleModal: (type:string) => void
        logInUser: (username: string, id: string) => void
    }>();

    const state = reactive({
      username: "",
      password: "",
      error: false
    })

    const fetchLogIn = async () => {
      const reqBody = {
        username: state.username,
        password: state.password
      };

      const res = await fetch("/api/user/log-in", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(reqBody)
      })

      if(res.ok) {
        const resJSON = await res.json();
        const user: UserInterface = resJSON.user;
        props.logInUser(user.username, user.id);
        props.toggleModal("");
      } else {
        state.error = true
      }
    }

</script>

<template>
  <div class="logInContent">
    <h2>Log In Here</h2>
    <form class="logInForm" @submit.prevent @submit="fetchLogIn">
      <input type="text" placeholder="email" v-model="state.username"/>
      <input type="password" placeholder="password" v-model="state.password"/>
      <button type="submit">Log In</button>
      <div v-if="state.error" class="errorMessage">Error Signing In</div>
    </form>
  </div>
</template>

<style scoped>

  .closeButton {
    width: 2rem;
    margin-top: .5rem;
    margin-right: .5rem;
  }

  .logInContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .logInForm {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .errorMessage {
    color: red;
    width: 100%;
    text-align: center;
  }
</style>
