import { Prisma } from "@prisma/client";
import axios from "axios";

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
