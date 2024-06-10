<script lang="ts" setup>
const props = defineProps({
  answer: String
})

const emit = defineEmits(['click']);
</script>

<template>
  <v-btn block class="bg-background text-none text-background-foreground" size="x-large" @click="emit('click')" :elevation="0" rounded="lg">
    {{ props.answer }}
  </v-btn>
</template>

<style lang="scss">
.btn-wrap-text {
  height: auto !important;
  max-width: 100%;
  white-space: normal;
  &.v-btn:not(.v-btn--round).v-size--default {
    padding: 10px 16px;
  }
  .v-btn__content {
    flex: 1 0 fit-content;
  }
}
</style>
