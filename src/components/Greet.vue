<script setup lang="ts">
import { ref } from 'vue'
import { invoke } from '@tauri-apps/api/core'

const greetMsg = ref('')
const name = ref('')
import Database from '@tauri-apps/plugin-sql'

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsg.value = await invoke('greet', {
    name: name.value
  })
}

// when using `"withGlobalTauri": true`, you may use
// const V = window.__TAURI__.sql;

const db = await Database.load('sqlite:test.db')
console.log(db.path)
// db.execute('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);').then(res => {
//   console.log(res)
// })
</script>

<template>
  <form
    class="row"
    @submit.prevent="greet"
  >
    <input
      id="greet-input"
      v-model="name"
      placeholder="Enter a name..."
    >
    <button type="submit">Greet</button>
  </form>

  <p>{{ greetMsg }}</p>
</template>
