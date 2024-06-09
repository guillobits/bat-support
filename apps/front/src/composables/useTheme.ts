import { ref } from 'vue'

export const DEFAULT_APP_BG_COLOR = 'background'

const backgroundColor = ref(DEFAULT_APP_BG_COLOR)

export function useTheme() {
  function setAppBackgroundColor(color: string) {
    backgroundColor.value = color
  }

  return {
    setAppBackgroundColor,
    backgroundColor,
  }
}
