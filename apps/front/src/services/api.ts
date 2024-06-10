import { Prisma } from "@prisma/client";
import axios from "axios";
import { CreateSupportTicketDto } from "shared-types";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// Types
export type QuestionWithAnswers = Prisma.QuestionGetPayload<{
  include: { answers: true }
}>

/**
 * Api - Fetch a question
 * @param id The question id to fetch
 * @returns Promise of question with answers
 */
export const getQuestion = async (id = 1) : Promise<QuestionWithAnswers> => {
  try {
    const { data } = await axiosClient.get(`question/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      throw Error(`Impossible de joindre le serveur`)
    }
    else if (!error.response || error.response.status === 404) {
      throw Error(`La question ${id} n'existe pas`)
    }
  }
}

/**
 * Api - Create a supportTicket
 * @param form
 * @returns
 */
export const createSupportTicket = async (form: CreateSupportTicketDto) => {
  try {
    const { data } = await axiosClient.post(`support-ticket/`, form, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      throw Error(`Impossible de joindre le serveur`)
    }
    else if (!error.response || error.response.status !== 201) {
      throw Error(`La demande d'assistance n'a pas pu être enregistrée`);
    }
    throw Error(`Une erreur inconnue s'est produite`);
  }
}
