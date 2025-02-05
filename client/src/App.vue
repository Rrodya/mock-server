<template>
  <div>
    <h1>Posts</h1>
    <div v-for="session in sessions" :key="post.id">
      {{ session.created_at }}
    </div>
    <input v-model="newPost.title" placeholder="Title">
    <button @click="addPost">Add Post</button>
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import axios from "axios";

const sessions = ref([]);
onMounted(async () => {
  sessions.value = await axios.get("/api/sessions");
  console.log(sessions.value);
})

async function getSessions() {
  return await sessions.value();
}
</script>
