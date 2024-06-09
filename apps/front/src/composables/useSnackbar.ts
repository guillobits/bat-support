import { ref } from 'vue'

const message = ref<string | null>(null)
const showSnackbar = ref(false)

export function useSnackbar() {
  function setErrorMessage(errorMessage: string) {
    message.value = errorMessage
    showSnackbar.value = true
    setTimeout(() => {
      showSnackbar.value = false
    }, 5000)
  }

  return {
    message,
    showSnackbar,
    setErrorMessage,
  }
}
