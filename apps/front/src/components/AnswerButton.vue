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
