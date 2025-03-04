<template>
  <aside class="sessions">
    <div v-if="sessions !== null" class="session-wrapper">
      <ul v-if="sessions.length" class="list">
        <li class="p-4 pb-2 text-2xl font-bold tracking-wide flex justify-between items-center">
          <span>Сессии</span>
          <button class="btn btn-primary" @click="emit('go-create-session')">Создать</button>
        </li>
        <li
          class="list-row flex justify-between items-center"
          v-for="session in sessions"
          :key="session.id"
        >
          <div>
            <p class="text-lg">{ session.title }}</p>
            <code class="text-xs">{{ session.baseUrl }}</code>
          </div>
          <button v-if="session.id === activeSessionId" class="btn btn-accent w-32">Активна</button>
          <button
            v-else
            class="btn btn-soft btn-secondary w-32"
            @click="setActiveSession(session.id)"
          >
            Активировать
          </button>
        </li>
      </ul>
      <p class="text-center p-4" v-else>Сессии отстутсвуют</p>
    </div>
    <div v-else-if="sessions === null && isLoading" class="flex justify-center">
      <span class="loading loading-spinner loading-xl"></span>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useToast } from '@/components/Toaster/useToast.ts'
import { Infra } from '@/infra/infra.ts'
import { type Session } from '@/infra/sessions/types.ts'
import { onMounted, ref } from 'vue'

const sessions = ref<Session[]>([])
const $toast = useToast()
const activeSessionId = ref<string | null>(null)
const isLoading = ref(false)

const emit = defineEmits<{
  'set-active-session': [session: Session]
  'go-create-session': []
}>()

const setActiveSession = async (id: string) => {
  try {
    const responseSetActiveSession = await Infra.sessions.setActiveSession(id)

    const activeSession: Session | undefined = sessions.value.find(
      (session) => session.id == responseSetActiveSession.activeSession,
    )

    if (activeSession) {
      emit('set-active-session', activeSession)
      $toast.success('Установленая активная сессия: ' + activeSession.title)
    } else {
      $toast.warning(
        'Была установелна ниизвестная сессия с id: ' + responseSetActiveSession.currentSession,
      )
    }
  } catch (error) {
    $toast.error('Неизвестная ошибка ', error.message)
  }
  activeSessionId.value = id
  Infra.sessions.setActiveSession(id)
}

onMounted(async () => {
  try {
    isLoading.value = true
    const responseAllSessions = await Infra.sessions.getAllSessions()

    sessions.value = responseAllSessions
    $toast.info('Все сессии получены')
    isLoading.value = false

    const responseActiveSession = await Infra.sessions.getActiveSession()

    const activeSession = sessions.value.find(
      (session) => session.id === responseActiveSession.activeSession,
    )
    if (activeSession) {
      activeSessionId.value = activeSession.id
      $toast.info('Активная сессия: ' + activeSession.title)
    } else {
      $toast.warning('Активная сессия не найдена, скорей всего нету сессий')
    }
  } catch (error) {
    $toast.error('Неизвестная ошибка ' + error.message)
  }
})
</script>

<style>
.sessions {
  width: 400px;
}

.session__list-item {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

.session__list-item:hover {
  background-color: #222222;
}

.session_active {
  color: green;
}

.status-session-button {
  font-family: 'GTL';
  font-weight: lighter;
  outline: none;
  border: none;
  color: white;
  box-shadow: none;
  text-decoration: none;
  padding: 3px 0;
  width: 70px;
  height: 30px;
  cursor: pointer;
}
.enabled-session {
  background-color: green;
}

.disabled-session {
  background-color: red;
}
</style>
