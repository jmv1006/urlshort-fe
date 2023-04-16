<script setup lang="ts">
import { ref } from 'vue'
import InputContainer from './InputContainer.vue';


const person = ref({
  name: "Jonathan",
  age: 21
})

</script>

<template>
  <div class="helloWorldContainer">
    <div id="mainTitle">url-short</div>
    <InputContainer />
  </div>
</template>

<style scoped>
  .helloWorldContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 15rem;
  }

  #mainTitle {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
</style>
