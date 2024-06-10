<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useSnackbar } from '../composables/useSnackbar';
import { useTheme } from '../composables/useTheme';

const { message, showSnackbar, colorSnackbar } = useSnackbar();
const { backgroundColor } = useTheme();
const router = useRouter();

const onContactClick = () => {
  window.open('https://cal.com/guillobits');
};
const onLogoClick = () => {
  router.push('/');
}
</script>

<template>
  <v-app :class="`bg-${backgroundColor}`">
    <v-layout class="w-full">
      <v-app-bar
        color="top-bar"
        class="py-0 d-flex justify-space-between"
        :height="61"
      >
        <button
          class="d-flex bg-background-bis h-100 align-center px-5 font-weight-bold font-italic text-h6"
          @click="onLogoClick"
        >
        BatSupport<span class="text-primary">.</span>
        </button>
        <div class="flex-grow-1"></div>
        <button
          class="d-flex bg-primary text-primary-foreground h-100 align-center px-5 font-weight-bold text-h6"
          @click="onContactClick"
        >
          Contact
        </button>
      </v-app-bar>

      <v-main class="block">
        <v-container class="mb-15">
          <router-view></router-view>
        </v-container>
        <v-footer
          color="black"
          class="max-width position-fixed bottom-0 left-0 right-0 py-4 font-weight-bold text-h6 font-italic"
        >
          <v-row justify="center" no-gutters>
            BatSupport<span class="text-primary">.</span>
          </v-row>
        </v-footer>
      </v-main>
      <v-snackbar :color="colorSnackbar" v-model="showSnackbar" multi-line>
        {{ message }}
      </v-snackbar>
    </v-layout>
  </v-app>
</template>
