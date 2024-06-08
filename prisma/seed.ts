import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const questionsData = [
    {
      id: 1,
      question: 'Où se situe votre problème ?',
      answers: [
        { id: 1, answer: 'WC', nextQuestionId: 2 },
        { id: 2, answer: 'Lavabo', nextQuestionId: 3 },
        { id: 3, answer: 'Douche', nextQuestionId: 4 },
        {
          id: 4,
          answer: "Colonne générale d'immeuble",
          nextQuestionId: null,
        },
        { id: 5, answer: 'Tuyauterie', nextQuestionId: 5 },
        { id: 6, answer: 'Chaudière', nextQuestionId: 6 },
        {
          id: 7,
          answer: 'Tuyau de la machine à laver / du lave-vaisselle',
          nextQuestionId: null,
        },
        { id: 8, answer: 'Autre', nextQuestionId: null },
      ],
    },
    {
      id: 2,
      question: 'Quelle est la nature de votre problème ?',
      answers: [
        { id: 9, answer: 'Engorgement (WC bouchés)', nextQuestionId: 7 },
        { id: 10, answer: 'Fuite (recherche de fuite)', nextQuestionId: 7 },
        {
          id: 11,
          answer: 'Problème de fonctionnement (cuvette...)',
          nextQuestionId: 7,
        },
        { id: 12, answer: 'Changement de WC', nextQuestionId: 7 },
      ],
    },
    {
      id: 3,
      question: 'Quelle est la nature de votre problème ?',
      answers: [
        {
          id: 13,
          answer: 'Engorgement (lavabo / évier bouché)',
          nextQuestionId: 8,
        },
        { id: 14, answer: 'Fuite / robinetterie', nextQuestionId: 9 },
        { id: 15, answer: 'Autre', nextQuestionId: 10 },
      ],
    },
    {
      id: 4,
      question: 'Quelle est la nature de votre problème ?',
      answers: [
        {
          id: 16,
          answer: 'Engorgement de douche (bouchée)',
          nextQuestionId: null,
        },
        {
          id: 17,
          answer: 'Engorgement de baignoire (bouchée)',
          nextQuestionId: null,
        },
        { id: 18, answer: 'Fuite de douche', nextQuestionId: 11 },
        { id: 19, answer: 'Fuite de baignoire', nextQuestionId: 12 },
        { id: 20, answer: 'Autre', nextQuestionId: 13 },
      ],
    },
    {
      id: 5,
      question: 'Vous avez une fuite au niveau ?',
      answers: [
        {
          id: 21,
          answer: "D'un tuyau d’évacuation (tuyau PVC)",
          nextQuestionId: null,
        },
        { id: 22, answer: 'De la vanne d’entrée', nextQuestionId: null },
        { id: 23, answer: "D'un autre tuyau", nextQuestionId: null },
        {
          id: 24,
          answer: "Je ne vois pas (recherche d'une fuite)",
          nextQuestionId: 14,
        },
      ],
    },
    {
      id: 6,
      question: 'Quel est votre besoin ?',
      answers: [
        { id: 25, answer: "Réparation d'une panne", nextQuestionId: 15 },
        {
          id: 26,
          answer: "Souscription d'un contrat d'entretien",
          nextQuestionId: null,
        },
        {
          id: 27,
          answer: "Réparation d'une fuite du ballon d'eau chaude",
          nextQuestionId: null,
        },
        { id: 28, answer: 'Autre', nextQuestionId: null },
        { id: 29, answer: 'Installation', nextQuestionId: 16 },
      ],
    },
    {
      id: 7,
      question: 'Quel type de WC possédez-vous ?',
      answers: [
        { id: 30, answer: 'WC simple', nextQuestionId: null },
        { id: 31, answer: 'WC suspendu', nextQuestionId: null },
        { id: 32, answer: 'Autre', nextQuestionId: null },
      ],
    },
    {
      id: 8,
      question: 'Votre lavabo possède-t-il un sanispeed ?',
      answers: [
        { id: 33, answer: 'Oui', nextQuestionId: null },
        { id: 34, answer: 'Non', nextQuestionId: null },
      ],
    },
    {
      id: 9,
      question: 'D’où coule l’eau ?',
      answers: [
        { id: 35, answer: 'Autour du robinet', nextQuestionId: null },
        { id: 36, answer: 'Directement du robinet', nextQuestionId: null },
        { id: 37, answer: 'Au niveau du siphon', nextQuestionId: null },
        { id: 38, answer: 'Au niveau des flexibles', nextQuestionId: null },
      ],
    },
    {
      id: 10,
      question: 'Voulez-vous effectuer ?',
      answers: [
        {
          id: 39,
          answer: 'Changement de lavabo / évier',
          nextQuestionId: null,
        },
        { id: 40, answer: "Installation d'un robinet", nextQuestionId: null },
        { id: 41, answer: 'Autre', nextQuestionId: null },
      ],
    },
    {
      id: 11,
      question: 'D’où coule l’eau ?',
      answers: [
        { id: 42, answer: 'Du robinet', nextQuestionId: null },
        {
          id: 43,
          answer: 'Du tuyau d’évacuation (sous la douche)',
          nextQuestionId: null,
        },
        { id: 44, answer: 'Inconnu', nextQuestionId: null },
      ],
    },
    {
      id: 12,
      question: 'D’où coule l’eau ?',
      answers: [
        { id: 45, answer: 'Du robinet', nextQuestionId: null },
        { id: 46, answer: 'Du tuyau d’évacuation', nextQuestionId: null },
        { id: 47, answer: 'Inconnu', nextQuestionId: null },
      ],
    },
    {
      id: 13,
      question: 'Voulez-vous effectuer ?',
      answers: [
        {
          id: 48,
          answer: 'Installation de bac à douche',
          nextQuestionId: null,
        },
        { id: 49, answer: 'Installation de baignoire', nextQuestionId: null },
        {
          id: 50,
          answer: 'Autre problème avec la douche',
          nextQuestionId: null,
        },
        {
          id: 51,
          answer: 'Autre problème avec la baignoire',
          nextQuestionId: null,
        },
        {
          id: 52,
          answer: 'Réfection des joints de la douche / baignoire',
          nextQuestionId: null,
        },
      ],
    },
    {
      id: 14,
      question: 'Quel type de recherche de fuite souhaitez-vous ?',
      answers: [
        { id: 53, answer: 'Recherche de fuite simple', nextQuestionId: null },
        {
          id: 54,
          answer: 'Recherche de fuite encastrée',
          nextQuestionId: null,
        },
      ],
    },
    {
      id: 15,
      question: 'Votre problème est lié ?',
      answers: [
        { id: 55, answer: 'Au chauffage', nextQuestionId: null },
        { id: 56, answer: "À l'eau chaude", nextQuestionId: null },
        {
          id: 57,
          answer: "Au chauffage et à l'eau chaude",
          nextQuestionId: null,
        },
      ],
    },
    {
      id: 16,
      question: 'Quel objet est concerné par votre demande ?',
      answers: [
        { id: 58, answer: 'Chaudière', nextQuestionId: null },
        {
          id: 59,
          answer: 'Chauffe-eau / chauffe-bain',
          nextQuestionId: null,
        },
        { id: 60, answer: "Ballon d'eau chaude", nextQuestionId: null },
        {
          id: 61,
          answer: 'Radiateur électrique / sèche-serviettes',
          nextQuestionId: null,
        },
      ],
    },
  ];

  // Insert questions and answers in a single transaction
  // Insertion des questions
  for (const { question, answers } of questionsData) {
    await prisma.question.create({
      data: {
        question,
        answers: {
          create: answers.map(({ id, answer }) => ({ id, answer })),
        },
      },
    });
  }

  // Mise à jour des réponses avec les nextQuestionId corrects
  for (const { answers } of questionsData) {
    for (const { id, nextQuestionId } of answers) {
      if (nextQuestionId !== null) {
        await prisma.answer.update({
          where: { id },
          data: { nextQuestionId },
        });
      }
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
