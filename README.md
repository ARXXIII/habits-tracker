# Habits Tracker

A simple **Habits Tracker** application built with **Bun**, **TypeScript**, **MongoDB (Mongoose)**, and **GraphQL Yoga**, fully containerized using **Docker Compose**.

---

## Tech Stack

- **Bun**
- **TypeScript**
- **MongoDB + Mongoose**
- **GraphQL Yoga**
- **Docker & Docker Compose**

---

## ⚙️ Environment Variables

Before running the project, create a `.env` file in the root directory with the following variables:

```env
MONGO_INITDB_ROOT_USERNAME=mongoadmin
MONGO_INITDB_ROOT_PASSWORD=mongopassword
MONGO_DB=habitsdb
MONGO_URI=mongodb://mongoadmin:mongopassword@mongo:27017/habitsdb?authSource=admin

PORT=4000

JWT_SECRET=
```

---

## Getting Started

- Clone repository and `cd` into it
- Install the dependencies and run the dev server
- Start MongoDB with Docker Compose

```bash
docker-compose up -d
bun install
bun run dev
```

Open [http://localhost:4000/graphql](http://localhost:4000/graphql) with your browser to see the result.
