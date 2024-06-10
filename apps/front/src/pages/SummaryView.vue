<script lang="ts" setup>
import { ref } from 'vue';
import SupportItemCard from '../components/SupportItemCard.vue';
import SupportItemTipsCard from '../components/SupportItemTipsCard.vue'
import SuggestContactCard from '../components/SuggestContactCard.vue';
import SupportTicketForm from '../components/SupportTicketForm.vue';

// Refs
const formOpen = ref(false)

const openForm = () => {
  formOpen.value = true
}

</script>

<template>
  <div>
    <v-row>
      <v-col :cols="12" :lg="8">
        <SupportTicketForm v-if="formOpen" />
        <SupportItemTipsCard v-else />
      </v-col>
      <v-col class="d-flex flex-column ga-5" :cols="12" :lg="4">
        <SupportItemCard @create-support-ticket="openForm" :display-cta="!formOpen"/>
        <SuggestContactCard v-if="formOpen" />
        <p class="text-body-2">
          <span class="font-weight-medium">Vous êtes recontactés sous 20 minutes après votre passage de commande.</span><br>
          L'artisan vous proposera un rendez-vous dès qu'il aura pris connaissance de votre commande.
          Une fois sur place, il analysera la situation et vous présentera un devis définitif.<br>
          En cas de non acceptation du devis, aucun frais n'est engagé (ni déplacement, ni établissement du devis).
        </p>
      </v-col>
    </v-row>
  </div>
</template>
