<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { rules } from '../utils/form-rules';
import { createSupportTicket } from '../services/api';
import { useSupportTicketStore } from '../stores/supportTicket.store'
import { useSnackbar } from '../composables/useSnackbar';
import { AnswerDto, CreateSupportTicketDto } from 'shared-types'

const form = ref(null);

const router = useRouter();
const supportTicketStore = useSupportTicketStore()
const snackbar = useSnackbar()

const submitForm = async () => {
  form.value?.validate().then(({ valid: isValid }) => {
    if (isValid) {
      const form : CreateSupportTicketDto = {
        paymentMethod: supportTicketStore.paymentMethod,
        author: {
          firstName: supportTicketStore.firstName,
          lastName: supportTicketStore.lastName,
          address: supportTicketStore.address,
          zipcode: supportTicketStore.zipCode,
          email: supportTicketStore.email,
          phoneNumber: supportTicketStore.phoneNumber,
          marketingOptin: supportTicketStore.marketingOptin
        },
        answers: supportTicketStore.answers as AnswerDto[]
      }
      createSupportTicket(form).then(() => {
        router.push({ name: 'home' })
        supportTicketStore.$reset()
        snackbar.setSuccessMessage("Une demande d'assitance à bien été créée. Vous serez recontactez rapidement.")
      }).catch((error) => {
        snackbar.setErrorMessage(error.message)
      })
    }
  });
};
</script>

<template>
  <v-card class="d-flex flex-column ga-10 pa-5" rounded="lg">
    <v-form ref="form" @submit.prevent="submitForm">
      <div class="form-section-title d-flex ga-5">
        <div class="step-num">1</div>
        <p class="step-title">Informations</p>
      </div>

      <v-row class="mt-3">
        <v-col :cols="12" :lg="6">
          <v-text-field
            label="Prénom"
            placeholder="Prénom"
            variant="outlined"
            :rules="[rules.required]"
            v-model="supportTicketStore.firstName"
          />
        </v-col>
        <v-col :cols="12" :lg="6">
          <v-text-field
            label="Nom"
            placeholder="Nom"
            variant="outlined"
            :rules="[rules.required]"
            v-model="supportTicketStore.lastName"
          />
        </v-col>
        <v-col :cols="12" :lg="6">
          <v-text-field
            label="Adresse (numéro et voie)"
            placeholder="Adresse"
            variant="outlined"
            v-model="supportTicketStore.address"
            :rules="[rules.required]"
          />
        </v-col>
        <v-col :cols="12" :lg="6">
          <v-text-field
            label="Code postal"
            placeholder="Code postal"
            variant="outlined"
            v-model="supportTicketStore.zipCode"
            :rules="[rules.required]"
          />
        </v-col>
        <v-col :cols="12" :lg="6">
          <v-text-field
            label="Téléphone"
            placeholder="Téléphone"
            variant="outlined"
            required
            v-model="supportTicketStore.phoneNumber"
            :rules="[rules.required, rules.phoneNumber]"
            type="tel"
          />
        </v-col>
        <v-col :cols="12" :lg="6">
          <v-text-field
            label="Email"
            placeholder="Email"
            variant="outlined"
            required
            v-model="supportTicketStore.email"
            :rules="[rules.required, rules.email]"
            type="email"
          />
        </v-col>
      </v-row>

      <div class="mt-5 form-section-title d-flex ga-5">
        <div class="step-num">2</div>
        <p class="step-title">Mode de paiement</p>
      </div>

      <v-radio-group :rules="[rules.required]" v-model="supportTicketStore.paymentMethod">
        <v-card
          color="background"
          class="mt-3 pa-4 font-weight-medium"
          rounded="lg"
          :elevation="0"
        >
          <v-radio label="Payer sur place" value="ONSITE" />
        </v-card>
        <v-card
          color="background"
          class="mt-3 pa-4 font-weight-medium"
          rounded="lg"
          :elevation="0"
        >
          <v-radio label="Payer en ligne" value="ONLINE" />
        </v-card>
      </v-radio-group>

      <v-checkbox :rules="[rules.required]">
        <template v-slot:label>
          <div>
            J’accepte les
            <a class="text-decoration-underline" href="#"
              >conditions générales d’utilisation du service</a
            >
          </div>
        </template>
      </v-checkbox>

      <v-checkbox :rules="[rules.required]">
        <template v-slot:label>
          <div>
            J’ai bien pris connaissance des
            <a class="text-decoration-underline" href="#"
              >dispositions relatives au droit de rétractation</a
            >
          </div>
        </template>
      </v-checkbox>

      <v-checkbox
        label="Je souhaite recevoir par voie électronique des offres commerciales personnalisées"
        v-model="supportTicketStore.marketingOptin"
      />

      <div class="mt-5 d-flex ga-2">
        <v-btn
          variant="outlined"
          color="primary"
          size="large"
          rounded="xl"
          class="mt-2 text-none"
          @click="router.back"
          >Etape précédente</v-btn
        >
        <v-btn
          color="primary"
          size="large"
          rounded="xl"
          class="mt-2 text-none"
          type="submit"
          >Passer commande et payer en ligne</v-btn
        >
      </div>
    </v-form>
  </v-card>
</template>

<style lang="scss">
.form-section-title {
  display: flex;
  align-items: center;
  font-size: 18px;

  .step-num {
    display: flex;
    background-color: rgb(var(--v-theme-primary));
    width: 30px;
    height: 30px;
    color: rgb(var(--v-theme-primary-foreground));
    justify-content: center;
    align-items: center;
  }

  .step-title {
    font-weight: 600;
  }
}
</style>
