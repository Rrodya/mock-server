<template>
  <aside class="sessions">
    <h2>Сессии</h2>
    <div v-if="sessions !== null" class="session-wrapper">
      <ul v-if="sessions.length" class="session__list">
        <li v-for="(session, index) in sessions" :key="index" class="session__list-item">
          <h3>{{ session.title }}</h3>
          <button v-if="session.id === activeSessionId" class="status-session-button enabled-session">Disable</button>
          <button v-else class="status-session-button disabled-session" @click="setActiveSession(session.id)" >Enable</button>
        </li>
      </ul>
      <p v-else>Сессии не были найдены</p>
    </div>
    <div v-else-if="sessions === null && isLoading">
      Загрузка
    </div>
  </aside>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {type Session} from "@/infra/sessions/types.ts";
import {Infra} from "@/infra/infra.ts";
import {useToast} from "@/components/Toaster/useToast.ts";

const sessions = ref<Session[]>([]);
const $toast = useToast();
const activeSessionId = ref<string | null>(null);
const isLoading = ref(false);

const setActiveSession = async (id: string) => {
  try {
    const responseSetActiveSession = await Infra.sessions.setActiveSession(id);
    console.log(responseSetActiveSession);
    sessions.value.forEach((session: Session) => console.log(session.id, responseSetActiveSession.activeSession));
    const activeSession = sessions.value.find(session => session.id == responseSetActiveSession.activeSession)
    if (activeSession) {
      $toast.success('Установленая активная сессия: ' + activeSession.title);
    } else {
      $toast.success('Была установелна ниизвестная сессия с id: ' + responseSetActiveSession.currentSession);
    }
  } catch (error) {
    $toast.error('Неизвестная ошибка ', error.message);
  }
  activeSessionId.value = id;
  Infra.sessions.setActiveSession(id)
}

onMounted(async () => {
  try {
    isLoading.value = true;
    const responseAllSessions = await Infra.sessions.getAllSessions();

    sessions.value = responseAllSessions;
    $toast.success('Все сессии получены');
    isLoading.value = false;

    const responseActiveSession = await Infra.sessions.getActiveSession();

    const activeSession = sessions.value.find(session => session.id === responseActiveSession.activeSession);
    if (activeSession) {
      activeSessionId.value = activeSession.id;
      $toast.success('Активная сессия: ' + activeSession.title);
    } else {
      $toast.warning('Активная сессия не найдена, скорей всего нету сессий');
    }
  } catch(error) {
    $toast.error('Неизвестная ошибка ' + error.message);
  }
})

</script>

<style>
.sessions {
  background-color: #2c3e50;
  width: 300px;
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
  border:none;
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
