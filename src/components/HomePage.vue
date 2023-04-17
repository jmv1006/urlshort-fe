<script setup lang="ts">
import { ref } from 'vue'
import InputContainer from './InputContainer.vue';
import Footer from './Footer.vue';

</script>

<template>
  <div class="homeContainer">
    <div id="mainTitle">url-short</div>
    <InputContainer />
  </div>
  <Footer />
</template>

<style scoped>
  .homeContainer {
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
