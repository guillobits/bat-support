# Bat-Support - SupportTicket Questions

## Start the application

Run `npm install` to install the dependencies

Run `docker compose build` to build, and then,

Run `docker compose up` to start the development server.

Then, in a new terminal :

Run `npx prisma db push` to intialize db structure

Run `npx prisma generate` to ensure the prisma client has generated the types

Run `npx prisma db seed` to run the seed of the db

## Run the tests

Run `npx nx test front` to test the front features

Run `npx nx test back` to test the back features

## Let's go!

The application should be available at this url :
`http://localhost:4200/`

## Architecture

This project is a monorepo application using NX, consisting of a frontend application with Vue.js 3 using Composition API and a backend application with NestJS using Prisma as ORM.

- Frontend: Vue.js 3 application using Composition API.
- Backend: NestJS application with Prisma as ORM.

