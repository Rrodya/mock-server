import type { Component } from 'vue'
import CreateSessionVue from './CreateSession.vue'

export const MainComponentsKeys = {
  CreateSession: 'CreateSession',
}

export type MainComponentsDict = {
  [MainComponentsKeys.CreateSession]: Component
}

export const MainComponents: MainComponentsDict = {
  [MainComponentsKeys.CreateSession]: CreateSessionVue,
}
