<script lang="ts" setup>
const props = defineProps({
  title: String
})
</script>

<template>
  <v-card class="pa-5 text-center d-flex flex-column align-center ga-5" color="primary-light" :elevation="0" rounded="xl">
    <div class="icon-container">
      <slot name="icon" />
    </div>
    <p class="bg-primary font-weight-bold pa-1">
      {{ props.title }}
    </p>
  </v-card>
</template>

<style lang="scss" scoped>
.icon-container {
  display:flex;
  max-width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
}
</style>
