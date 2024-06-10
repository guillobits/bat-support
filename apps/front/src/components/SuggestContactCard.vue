<script lang="ts" setup>
import { ref } from 'vue';

// Refs
const displayPhoneNumber = ref(false)

// Methods
const onContactClick = () => {
  if (!displayPhoneNumber.value)
    displayPhoneNumber.value = true
  else
    window.open('tel:+33649357803')
}
</script>

<template>
  <v-card class="d-flex flex-column ga-10 pa-5" color="primary-light" rounded="lg">
    <h1 class="text-h6 text-primary font-weight-medium">
      Besoin d’une assistance téléphonique ?
    </h1>
    <v-btn color="primary" rounded size="large" @click="onContactClick">
      <span v-if="displayPhoneNumber">
        (+33) 06 49 35 78 03
      </span>
      <span v-else>Afficher le numéro</span>
    </v-btn>
  </v-card>
</template>
