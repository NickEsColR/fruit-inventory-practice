# Fruit Inventory API

A RESTful API built with **Node.js**, **TypeScript**, and **Express 5** for managing a fruit inventory backed by a **PostgreSQL** database. The project follows **Clean Architecture** principles with clearly separated concerns across configuration, data access, domain, infrastructure, and presentation layers. Persistence is handled via **Prisma ORM** with a PostgreSQL adapter.

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
│   ├── app.ts                                      # Application entry point
│   ├── config/
│   │   └── envs.ts                                 # Validated environment variables
│   ├── data/
│   │   └── postgres/
│   │       └── index.ts                            # Prisma client singleton
│   ├── domain/
│   │   ├── datasources/
│   │   │   └── inventory.datasource.ts             # Abstract datasource contract
│   │   ├── dtos/
│   │   │   └── inventory/
│   │   │       ├── create-fruit.dto.ts             # Validation DTO for creation
│   │   │       └── update-fruit.dto.ts             # Validation DTO for updates
│   │   ├── entities/
│   │   │   └── fruit.entity.ts                     # Fruit domain entity
│   │   ├── repositories/
│   │   │   └── inventory.repository.ts             # Abstract repository contract
│   │   └── use-cases/
│   │       └── inventory/
│   │           ├── create-fruit.ts                 # Create fruit use case
│   │           ├── delete-fruit.ts                 # Delete fruit use case
│   │           ├── get-fruit.ts                    # Get single fruit use case
│   │           ├── get-fruits.ts                   # Get all fruits use case
│   │           └── update-fruit.ts                 # Update fruit use case
│   ├── infraestructure/
│   │   ├── datasource/
│   │   │   └── inventory.datasource.impl.ts        # Prisma datasource implementation
│   │   └── repositories/
│   │       └── inventory.repository.impl.ts        # Repository implementation
│   └── presentation/
│       ├── server.ts                               # Express server class
│       ├── routes.ts                               # Root route aggregator
│       └── inventory/
│           ├── controller.ts                       # Request handlers (delegates to use cases)
│           └── routes.ts                           # Dependency wiring & route definitions
├── prisma/
│   ├── schema.prisma                               # Prisma schema (Fruit model)
│   └── migrations/                                 # Auto-generated SQL migrations
├── generated/
│   └── prisma/                                     # Prisma generated client
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
{ "error": "ID must be a number" }
```

```json
{ "error": "Quantity must be a positive number" }
```

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

The project follows **Clean Architecture** principles with four clearly separated layers:

### Domain Layer (`src/domain/`)

The core of the application. Contains no dependencies on frameworks or external libraries.

- **`entities/`** — `FruitEntity` models the core business object and validates its fields via static factory method `fromObject()`.
- **`datasources/`** — Abstract `InventoryDataSource` class defining the data access contract (`create`, `getAll`, `findById`, `updateById`, `deleteById`).
- **`repositories/`** — Abstract `InventoryRepository` class acting as the port between domain use cases and the infrastructure layer.
- **`dtos/`** — `CreateFruitDto` and `UpdateFruitDto` encapsulate and validate input data, returning a typed `[error?, dto?]` tuple.
- **`use-cases/`** — One class per operation (`GetFruits`, `GetFruit`, `CreateFruit`, `UpdateFruit`, `DeleteFruit`), each receiving a repository via constructor injection and delegating to it.

### Infrastructure Layer (`src/infraestructure/`)

Concrete implementations of domain abstractions, dependent on Prisma.

- **`datasource/inventory.datasource.impl.ts`** — Implements `InventoryDataSource` using Prisma queries against PostgreSQL and maps results to `FruitEntity` instances.
- **`repositories/inventory.repository.impl.ts`** — Implements `InventoryRepository` by delegating all calls to the injected datasource.

### Data Layer (`src/data/`)

- **`postgres/index.ts`** — Exports a Prisma client singleton configured with the `@prisma/adapter-pg` driver adapter.

### Presentation Layer (`src/presentation/`)

Handles HTTP concerns only. Controllers contain no business logic.

- **`server.ts`** — `Server` class initializes Express, registers `json` and `urlencoded` middlewares, mounts routes, and starts the HTTP listener.
- **`presentation/routes.ts`** — Top-level route aggregator that namespaces all feature routes under `/api`.
- **`inventory/routes.ts`** — Wires together datasource, repository, and controller via constructor injection.
- **`inventory/controller.ts`** — Validates inputs with DTOs, then delegates each request to the corresponding use case via promise chaining.

### Configuration (`src/config/`)

- **`envs.ts`** — Centralizes and validates all environment variables using `env-var`, throwing at startup if any required variable is missing.

> Path aliases (`@/*` → `src/*`) are configured in `tsconfig.json` and resolved at runtime via `tsconfig-paths`.

---

## License

This project is licensed under the **ISC License**.
