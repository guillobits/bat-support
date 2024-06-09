<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { QuestionWithAnswers, getQuestion } from '../services/api';
import QuestionTitle from '../components/QuestionTitle.vue';
import AnswerButton from '../components/AnswerButton.vue';
import { useRoute, useRouter } from 'vue-router';
import { watch } from 'vue';
import { useSnackbar } from '../composables/useSnackbar';
import { Answer } from '@prisma/client';

// Hooks
const route = useRoute()
const router = useRouter()
const snackbar = useSnackbar()


// Watchers
watch(() => route.params.id, (newId) => {
  if (typeof newId === "string") {
    updateQuestion(parseInt(newId))
  }
})

// Refs
const question = ref<QuestionWithAnswers>(null)

// Computed props
const gotPreviousQuestion = computed(() => {
  return router
})

// Methods
const updateQuestion = (id: number) => {
  getQuestion(id).then((q) => {
    question.value = q
  }).catch((error) => {
    snackbar.setErrorMessage(error.message)
  })
}

const onAnswerClick = (answer: Answer) => {
  if (answer.nextQuestionId) {
    router.push(`/question/${answer.nextQuestionId}`)
  }
}

// Events
onMounted(() => {
  if (typeof route.params.id === "string")
    updateQuestion(parseInt(route.params.id));
})
</script>

<template>
  <div class="py-10">
    <div class="d-flex flex-column ga-8" v-if="question">
      <QuestionTitle :title="question.question" />
      <v-card class="pa-5" :elevation="5" rounded="lg">
        <v-row>
          <v-col cols="12" sm="6" v-for="answer in question.answers" :key="answer.id">
            <AnswerButton :answer="answer.answer" @click="onAnswerClick(answer)" />
          </v-col>
        </v-row>
        <v-btn class="mt-5 text-none font-weight-medium" variant="outlined" color="primary" rounded size="large"
          v-if="gotPreviousQuestion" @click="router.back()">
          Etape précédente
        </v-btn>
      </v-card>
      <v-card class="pa-5" color="info" :elevation="0" rounded="lg">
        <v-container>
          <v-col :offset="2" :column="8" class="d-flex flex-column ga-5">
            <p>
              <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.07994 7.24709C3.87994 7.24709 3.68994 7.16709 3.54994 7.02709L0.719941 4.19709C0.429941 3.90709 0.429941 3.42709 0.719941 3.13709C1.00994 2.84709 1.48994 2.84709 1.77994 3.13709L4.07994 5.43709L9.21994 0.29709C9.50994 0.00708985 9.98994 0.00708985 10.2799 0.29709C10.5699 0.58709 10.5699 1.06709 10.2799 1.35709L4.60994 7.02709C4.46994 7.16709 4.27994 7.24709 4.07994 7.24709Z"
                  fill="#008670" />
              </svg>
              Plus de <span class="font-weight-medium">1500 professionnels qualifiés</span>, recrutés selon des critères
              et un processus stricts
            </p>
            <p>
              <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.07994 7.24709C3.87994 7.24709 3.68994 7.16709 3.54994 7.02709L0.719941 4.19709C0.429941 3.90709 0.429941 3.42709 0.719941 3.13709C1.00994 2.84709 1.48994 2.84709 1.77994 3.13709L4.07994 5.43709L9.21994 0.29709C9.50994 0.00708985 9.98994 0.00708985 10.2799 0.29709C10.5699 0.58709 10.5699 1.06709 10.2799 1.35709L4.60994 7.02709C4.46994 7.16709 4.27994 7.24709 4.07994 7.24709Z"
                  fill="#008670" />
              </svg>
              Fourchette tarifaire <span class="font-weight-medium">connue à l’avance</span>, incluant le déplacement
              ainsi qu’un devis gratuit
            </p>
            <p>
              <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.07994 7.24709C3.87994 7.24709 3.68994 7.16709 3.54994 7.02709L0.719941 4.19709C0.429941 3.90709 0.429941 3.42709 0.719941 3.13709C1.00994 2.84709 1.48994 2.84709 1.77994 3.13709L4.07994 5.43709L9.21994 0.29709C9.50994 0.00708985 9.98994 0.00708985 10.2799 0.29709C10.5699 0.58709 10.5699 1.06709 10.2799 1.35709L4.60994 7.02709C4.46994 7.16709 4.27994 7.24709 4.07994 7.24709Z"
                  fill="#008670" />
              </svg>
              Intervention <span class="font-weight-medium">7j/7 24h/24</span> pour les dépannages d’urgence
            </p>
          </v-col>
        </v-container>
      </v-card>
    </div>
  </div>
</template>
