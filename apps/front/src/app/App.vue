<script setup lang="ts">
import { useSnackbar } from '../composables/useSnackbar';

const { message, showSnackbar } = useSnackbar()
</script>

<template>
  <v-app class="bg-background">
    <v-layout class="w-full">
      <v-app-bar color="top-bar" class="py-0 d-flex justify-space-between" :height="61">
        <div class="d-flex bg-background-bis h-100 align-center px-5 font-weight-bold font-italic text-h6">
          Goweb<span class="text-primary">.</span>
        </div>
        <div class="flex-grow-1"></div>
        <button
          class="d-flex bg-primary text-primary-foreground h-100 align-center px-5 font-weight-bold text-h6">Contact</button>
      </v-app-bar>

      <v-main class="block">
        <v-container>
          <router-view></router-view>
        </v-container>
        <v-footer color="black"
          class="max-width position-fixed bottom-0 left-0 right-0 py-4 font-weight-bold text-h6 font-italic">
          <v-row justify="center" no-gutters>
            Goweb<span class="text-primary">.</span>
          </v-row>
        </v-footer>
      </v-main>
      <v-snackbar color="error" v-model="showSnackbar" multi-line>
        {{ message }}
      </v-snackbar>
    </v-layout>
  </v-app>
</template>
