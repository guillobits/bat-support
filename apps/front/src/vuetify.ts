import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const myCustomTheme = {
  dark: false,
  colors: {
    primary: '#FF445F',
    'primary-foreground': '#FFFFFF',
    error: '#B71C1C',
    background: '#F2F2F2',
    'background-foreground': '#000000',
    topbar: '#FFFFFF',
    footer: '#000000',
    'background-bis': '#443D3C',
    'background-bis-foreground': '#FFFFFF',
    'info': '#DEFAE9',
    'primary-light': '#FFF0F1',
    'black': '#000000',
  }
}

export const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme,
    },
  }

})
