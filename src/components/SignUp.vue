<script setup lang="ts">
import { reactive } from 'vue';
import useStore from '../store/store';
import UserInterface from '../Config/Interfaces/UserInterface';

    interface IState {
      username: string,
      password: string,
      confirmedPassword: string,
      passwordsMatch: boolean,
      error: boolean,
      loading: boolean
    }

    const store = useStore();

    const props = defineProps<{
        toggleModal: (type: string) => void
        logInUser: (username: string, id: string) => void
    }>();


    const state: IState = reactive({
      username: "",
      password: "",
      confirmedPassword: "",
      passwordsMatch: true,
      error: false,
      loading: false
    })

    const setPasswordsMatch = () => {
      if (state.password == state.confirmedPassword) state.passwordsMatch = true;
      else state.passwordsMatch = false;
    }

    const createUser = async () => {
      state.error = false;
      state.loading = true;

      const body = {
        username: state.username,
        rawPassword: state.password,
        confirmedPassword: state.confirmedPassword
      }

      const res = await fetch('/api/user', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(body)
      })

      if(res.ok) {
        const resJSON = await res.json();
        const user: UserInterface = resJSON.user;
        store.setUser(user);
        props.toggleModal('');
      } else {
        state.error = true
        state.loading = false
      }
    }

</script>

<template>
    <div class="signUpContent">
      <h2>Sign Up</h2>
      <form class="signUpForm" @submit.prevent @submit="createUser">
        <label>Username (Email)</label>
        <input type="email" v-model="state.username"/>
        <label>Password (At least 8 characters)</label>
        <input type="password" v-model="state.password" v-on:input="setPasswordsMatch"/>
        <label>Confirm Password</label>
        <input type="password" v-model="state.confirmedPassword" v-on:input="setPasswordsMatch"/>
        <button class="signUpButton" v-if="!state.loading" type="submit">Sign Up</button>
      </form>
      <div v-if="!state.passwordsMatch" class="errorText">Passwords Do Not Match</div>
      <div v-if="state.error" class="errorText">Error Signing Up</div>
    </div>
</template>

<style scoped>
  .signUpContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .signUpForm {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

  }

  .signUpButton {
    background-color: #7dcafa;
    border: none;
    padding: .25rem;
  }

  .signUpButton:hover {
    background-color: #7dcafa;
    border: none;
    padding: .25rem;
    text-decoration: underline;
    cursor: pointer;
  }

  .errorText {
    margin-top: 0.5rem;
  }
</style>
