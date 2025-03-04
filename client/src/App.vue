<script setup lang="ts">
import {ref} from "vue";
import SessionList from "@/components/SessionList.vue";

const selectedSession = ref<string | null>(null);

const setActiveSession = (id: string) => {
  selectedSessionId.value = id;
}
</script>

<template>
  <header>
    <h2>Header</h2>

 </header>

  <main>
    <SessionList @set-active-session="setActiveSessionId"></SessionList>
    <div class="blank"></div>
  </main>
</template>

<style scoped>
  header {
    display: flex;
    place-items: center;
    padding: 10px 0 30px 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  main {
    display: flex;
    gap: 30px;
  }

  .blank {
    background-color: lightgray;
    width: 100%;
  }
</style>
