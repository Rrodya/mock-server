import { inject } from 'vue'

let $toast = null

export function useToast() {
  if (!$toast) {
    $toast = inject('toast')
  }
  return $toast
}
