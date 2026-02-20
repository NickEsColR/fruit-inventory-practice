# Fruit Inventory API

A RESTful API built with **Node.js**, **TypeScript**, and **Express 5** for managing a fruit inventory backed by a **PostgreSQL** database. The project follows a clean layered architecture with separated concerns across configuration, data access, domain, and presentation layers. Persistence is handled via **Prisma ORM** with a PostgreSQL adapter.

This project is inspired by the course [NoNode.Js: De cero a expertode](https://cursos.devtalles.com/courses/nodejs-de-cero-a-experto) RestServer sections

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Runtime | Node.js |
| Language | TypeScript 5 |
| Framework | Express 5 |
| ORM | Prisma 7 |
| Database | PostgreSQL 15 |
| DB Driver | pg |
| Environment | dotenv + env-var |
| Package manager | pnpm |

---

## Project Structure

```bash
fruit-inventory-practice/
├── src/
│   ├── app.ts                               # Application entry point
│   ├── config/
│   │   └── envs.ts                          # Validated environment variables
│   ├── data/
│   │   └── postgres/
│   │       └── index.ts                     # Prisma client singleton
│   ├── domain/
│   │   └── dtos/
│   │       └── inventory/
│   │           ├── create-fruit.dto.ts      # Validation DTO for creation
│   │           └── update-fruit.dto.ts      # Validation DTO for updates
│   └── presentation/
│       ├── server.ts                        # Express server class
│       ├── routes.ts                        # Root route aggregator
│       └── inventory/
│           ├── controller.ts                # Request handlers & business logic
│           └── routes.ts                    # Inventory-specific route definitions
├── prisma/
│   ├── schema.prisma                        # Prisma schema (Fruit model)
│   └── migrations/                          # Auto-generated SQL migrations
├── generated/
│   └── prisma/                              # Prisma generated client
├── docker-compose.yml                       # PostgreSQL container definition
├── .env                                     # Local environment variables (not committed)
├── .env.template                            # Environment variable template
├── tsconfig.json                            # TypeScript configuration
└── package.json
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [pnpm](https://pnpm.io/) v8 or higher
- [Docker](https://www.docker.com/) (for running the PostgreSQL database)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/NickEsColR/fruit-inventory-practice
cd fruit-inventory-practice
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

```bash
cp .env.template .env
```

Edit `.env` and fill in the required values:

### 4. Start the database

```bash
docker compose up -d
```

### 5. Run database migrations

```bash
npx prisma migrate dev
```

### 6. Generate Prisma client

```bash
npx prisma generate
```

### 7. Start the development server

```bash
pnpm dev
```

The server will start with hot-reload enabled. You should see:

```bash
Server is running on port 3000
```

---

## Available Scripts

| Script | Command | Description |
| --- | --- | --- |
| `dev` | `pnpm dev` | Start server with hot-reload (ts-node-dev) |
| `build` | `pnpm build` | Compile TypeScript to `dist/` |
| `start` | `pnpm start` | Run the compiled production build |

---

## Database Schema

Managed by Prisma with a PostgreSQL datasource.

```prisma
model Fruit {
  id        Int      @id @default(autoincrement())
  name      String
  quantity  Int
  createdAt DateTime @default(now())
}
```

---

## API Reference

Base URL: `http://localhost:{PORT}/api`

### Fruit Model

```json
{
  "id": "number (autoincrement)",
  "name": "string",
  "quantity": "number",
  "createdAt": "ISO 8601 datetime"
}
```

### Endpoints

#### Get all fruits

```postman
GET /api/inventory
```

**Response `200`**

```json
[
  { "id": 1, "name": "Apple", "quantity": 100, "createdAt": "2026-02-19T23:03:04.000Z" },
  { "id": 2, "name": "Banana", "quantity": 150, "createdAt": "2026-02-19T23:03:04.000Z" },
  { "id": 3, "name": "Orange", "quantity": 200, "createdAt": "2026-02-19T23:03:04.000Z" }
]
```

---

#### Get a fruit by ID

```postman
GET /api/inventory/:id
```

**Response `200`**

```json
{ "id": 1, "name": "Apple", "quantity": 100, "createdAt": "2026-02-19T23:03:04.000Z" }
```

**Response `400`**

```json
{ "error": "ID must be a number" }
```

**Response `404`**

```json
{ "error": "Fruit not found" }
```

---

#### Create a fruit

```postman
POST /api/inventory
Content-Type: application/json
```

##### Request body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | Yes | Name of the fruit |
| `quantity` | number | Yes | Stock quantity (non-negative) |

```json
{
  "name": "Mango",
  "quantity": 75
}
```

**Response `201`**

```json
{ "id": 4, "name": "Mango", "quantity": 75, "createdAt": "2026-02-19T23:03:04.000Z" }
```

**Response `400`** — validation error

```json
{ "error": "Name is required" }
```

```json
{ "error": "Quantity must be a positive number" }
```

---

#### Update a fruit

```postman
PUT /api/inventory/:id
Content-Type: application/json
```

**Request body** (all fields optional)

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | Updated name |
| `quantity` | number | Updated quantity (non-negative) |

```json
{
  "name": "Green Mango",
  "quantity": 50
}
```

**Response `200`**

```json
{ "id": 4, "name": "Green Mango", "quantity": 50, "createdAt": "2026-02-19T23:03:04.000Z" }
```

**Response `400`**

```json
{ "error": "ID is required and must be a number" }
```

```json
{ "error": "Quantity must be a positive number" }
```

**Response `404`**

```json
{ "error": "Fruit not found" }
```

---

#### Delete a fruit

```postman
DELETE /api/inventory/:id
```

**Response `200`** — Returns the deleted fruit object

```json
{ "id": 4, "name": "Green Mango", "quantity": 50, "createdAt": "2026-02-19T23:03:04.000Z" }
```

**Response `400`**

```json
{ "error": "ID must be a number" }
```

**Response `404`**

```json
{ "error": "Fruit not found" }
```

---

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | Yes | Port the HTTP server listens on |
| `POSTGRES_URL` | Yes | Full PostgreSQL connection string |
| `POSTGRES_USER` | Yes | PostgreSQL username (used by Docker) |
| `POSTGRES_PASSWORD` | Yes | PostgreSQL password (used by Docker) |
| `POSTGRES_DB` | Yes | PostgreSQL database name (used by Docker) |
| `POSTGRES_PORT` | No | PostgreSQL port (default: `5432`) |
| `NODE_ENV` | No | Application environment (`development`, `production`) |

---

## Architecture Overview

The project follows a **layered architecture**:

- **`config/`** — Centralizes and validates all environment variables using `env-var`, throwing at startup if any required variable is missing.
- **`data/postgres/`** — Exports a Prisma client singleton configured with the `@prisma/adapter-pg` driver adapter for PostgreSQL.
- **`domain/dtos/`** — Plain TypeScript classes (Data Transfer Objects) that encapsulate input validation logic for create and update operations, keeping it out of the controller.
- **`presentation/server.ts`** — Contains the `Server` class responsible for initializing Express, registering middleware (`json`, `urlencoded`), mounting routes, and starting the HTTP listener.
- **`presentation/routes.ts`** — Top-level route aggregator that namespaces feature routes under `/api`.
- **`presentation/inventory/`** — Feature-scoped module with its own router and fully async controller using Prisma for all database operations.

Path aliases (`@/*` → `src/*`) are configured via `tsconfig-paths` for cleaner imports.

---

## License

This project is licensed under the **ISC License**.
