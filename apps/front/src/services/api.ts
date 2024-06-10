import { Prisma, SupportTicket } from "@prisma/client";
import axios from "axios";
import { CreateSupportTicketDto } from "shared-types";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// Types
export type QuestionWithAnswers = Prisma.QuestionGetPayload<{
  include: { answers: true }
}>

export const getQuestion = async (id = 1) : Promise<QuestionWithAnswers> => {
  try {
    const { data } = await axiosClient.get(`question/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (error) {
    if (error.response.status === 404) {
      throw Error(`La question ${id} n'existe pas`)
    }
  }
}

export const createSupportTicket = async (form: CreateSupportTicketDto) => {
  try {
    const { data } = await axiosClient.post(`support-ticket/`, form, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (error) {
    if (error.response.status !== 201) {
      console.error(error);
      throw Error(`La demande d'assistance n'a pas pu être enregistrée`);
    }
    throw Error(`Une erreur inconnue s'est produite`);
  }
}
