<template>
  <div class="create-session">
    <p class="text-2xl pb-4">Создать сессию</p>
    <!-- <input v-model="sessionForm.title" type="text" placeholder="Название сессии" class="input" />
    <input
      v-model="sessionForm.baseUrl"
      type="text"
      placeholder="Url для проксирования"
      class="input"
    /> -->
    <fieldset class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
      <label class="fieldset-label text-base">Название</label>
      <input
        v-model="sessionForm.title"
        type="text"
        class="input"
        placeholder="My awesome session"
      />

      <label class="fieldset-label text-base">Url для проксирования</label>
      <input v-model="sessionForm.baseUrl" type="text" class="input" placeholder="127.0.0.1:3000" />
    </fieldset>
    <button class="btn btn-primary mt-6 w-full" :disabled="!isFormValid" @click="createSession">
      Создать
    </button>
  </div>
</template>
<script setup lang="ts">
import { Infra } from '@/infra/infra'
import { computed, ref } from 'vue'
import { useToast } from './Toaster/useToast'

const $toast = useToast()

const sessionForm = ref({
  title: '',
  baseUrl: '',
})

const isFormValid = computed(
  () => sessionForm.value.title.length > 0 && sessionForm.value.baseUrl.length > 0,
)

const createSession = async () => {
  try {
    const response = await Infra.sessions.createSession(sessionForm.value)
    $toast.success('Создана новая сессиия: ' + response.title)
    sessionForm.value.title = ''
    sessionForm.value.baseUrl = ''
  } catch (err) {
    $toast.error('Не удалось создать новую сессию')
  }
}
</script>
