<script setup lang="ts">
    const props = defineProps<{
        toggleModal: () => void
    }>();

</script>

<template>
  <div class="logInModalContainer">
    <div class="modalContent">
      Content
      <button @click="props.toggleModal" >X</button>
    </div>
  </div>
</template>

<style scoped>
  .logInModalContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
  }

  .modalContent {
    width: 30rem;
    height: 35rem;
    background-color: white;
  }
</style>
