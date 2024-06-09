import './variables.scss';
import './styles.scss';

import { createApp } from 'vue';
import App from './app/App.vue';
import { router } from './router';
import { vuetify } from './vuetify';

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')
