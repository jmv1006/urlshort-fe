<script setup lang="ts">
import { reactive } from 'vue';
import useStore from '../store/store';

    const store = useStore();
    const user = store.getUser();

    defineProps<{
        "toggle-modal": (type: string) => void
    }>();

    const state = reactive({
        changePasswordOpen: false,
        error: false,
        textFields: {
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
          newPasswordsMatch: true
        },
        changeSuccessful: false
    });

    const toggleChangePasswordForm = () => {
        state.changePasswordOpen = !state.changePasswordOpen
    }

    const handleNewPasswordsMatch = () => {
        if(state.textFields.newPassword.length == 0 && state.textFields.confirmNewPassword.length == 0) state.textFields.newPasswordsMatch = true
        else if(state.textFields.newPassword == state.textFields.confirmNewPassword) state.textFields.newPasswordsMatch = true
        else state.textFields.newPasswordsMatch = false
    }

    const changeUserPassword = async() => {
        const body = {
            id: user?.id,
            oldPassword: state.textFields.oldPassword,
            newPassword: state.textFields.newPassword,
            confirmedNewPassword: state.textFields.confirmNewPassword
        }

        const res = await fetch("/api/user/pw", {
            method: "PUT",
            headers: {
            'Content-Type': "application/json"
            },
            body: JSON.stringify(body)
        })

        if(res.ok) {
            // success, reset state
            state.textFields = {
              newPassword: "",
              confirmNewPassword: "",
              oldPassword: "",
              newPasswordsMatch: true
            }

            state.changePasswordOpen = false
            state.error = false

            state.changeSuccessful = true;
        } else {
            // error
            state.error = true;
        }
    }
</script>

<template>
  <div class="accountSettingsContent">
    <h3>Account Settings</h3>
    <button v-if="!state.changePasswordOpen" @click="toggleChangePasswordForm" class="baseButton">Change Password</button>
    <div v-else class="changePasswordContainer">
        <form class="changePasswordForm" @submit.prevent @submit="changeUserPassword">
            <label for="currentPassword">Current Password</label>
            <input name="currentPassword" type="password" v-model="state.textFields.oldPassword"/>

            <label for="newPassword">New Password (At least 8 characters)</label>
            <input name="newPassword" type="password" v-model="state.textFields.newPassword" v-on:input="handleNewPasswordsMatch"/>

            <label for="confirmedNewPassword">Confirm New Password (At least 8 characters)</label>
            <input name="confirmedNewPassword" type="password" v-model="state.textFields.confirmNewPassword" v-on:input="handleNewPasswordsMatch"/>

            <button v-if="state.textFields.newPasswordsMatch && state.textFields.newPassword.length > 0" type="submit" class="baseButton">Save</button>
            <button v-else class="baseButtonDisabled" disabled>Save</button>
            <button @click="toggleChangePasswordForm" class="baseButton">Cancel</button>
        </form>
        <div v-if="state.error" class="baseText">Error Changing Password</div>
    </div>
    <div class="baseText" v-if="state.changeSuccessful">Successfully Changed Password</div>
  </div>
</template>

<style scoped>  

.accountSettingsContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 2rem;
  }

  .changePasswordContainer {
    display: flex;
    flex-direction: column;
    width: 45%;
  }

  .changePasswordForm {
    display: flex;
    flex-direction: column;
    gap: .75rem;
  }

  .baseButton {
    margin-top: 0.75rem;
    background-color: #7dcafa;
    border: none;
    padding: .25rem;
  }

  .baseButtonDisabled {
    margin-top: 0.75rem;
    border: none;
    padding: .25rem;
  }

  .baseButton:hover {
    margin-top: 0.75rem;
    background-color: #7dcafa;
    border: none;
    padding: .25rem;
    text-decoration: underline;
    cursor: pointer;
  }

  .baseText {
    margin-top: 1rem;
    text-align: center;
  }
</style>
