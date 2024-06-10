import { ref } from 'vue'

const message = ref<string | null>(null)
const showSnackbar = ref(false)
const colorSnackbar = ref('error')

export function useSnackbar() {
  function openWithMessage(newMsg: string, color: string) {
    message.value = newMsg
    showSnackbar.value = true
    colorSnackbar.value = color
    setTimeout(() => {
      showSnackbar.value = false
    }, 5000)
  }

  function setErrorMessage(errorMessage: string) {
    openWithMessage(errorMessage, 'error')
  }

  function setSuccessMessage(successMessage: string) {
    openWithMessage(successMessage, 'success')
  }

  return {
    message,
    showSnackbar,
    colorSnackbar,
    setSuccessMessage,
    setErrorMessage,
  }
}
