<script lang="ts" setup>
const props = defineProps({
  title: String
})
</script>

<template>
  <v-card class="pa-3 text-center" color="primary-light" :elevation="0" rounded="xl">
    <div class="pa-8">
      <slot name="icon" />
    </div>
    <p class="bg-primary font-weight-bold">
      {{ props.title }}
    </p>
  </v-card>
</template>
