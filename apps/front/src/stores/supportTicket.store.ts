import { SupportTicketAnswer } from '@prisma/client'
import { defineStore } from 'pinia'

type SupportTicketAnswerForm = Pick<Partial<SupportTicketAnswer>, 'questionId' | 'answerId'>

export const useSupportTicketStore = defineStore('supportTicket', {
  state: () => ({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    zipCode: '',
    phoneNumber: '',
    marketingOptin: false,
    paymentMethod: null,
    answers: [] as SupportTicketAnswerForm[]
  }),
  actions: {
    addSupportTicketAnswer(questionId: number, answerId: number) {
      this.answers.push({
        questionId,
        answerId
      })
    },
  },
})
