# Fruit Inventory API

A RESTful API built with **Node.js**, **TypeScript**, and **Express 5** for managing a fruit inventory. The project demonstrates a clean layered architecture with separated concerns across configuration, presentation, and routing layers, and uses in-memory storage for simplicity.

This project is inspired by the course [NoNode.Js: De cero a expertode](https://cursos.devtalles.com/courses/nodejs-de-cero-a-experto) RestServer sections

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Runtime | Node.js |
| Language | TypeScript 5 |
| Framework | Express 5 |
| Environment | dotenv + env-var |
| ID generation | uuid |
| Package manager | pnpm |

---

## Project Structure

```bash
fruit-inventory-practice/
├── src/
│   ├── app.ts                          # Application entry point
│   ├── config/
│   │   └── envs.ts                     # Validated environment variables
│   └── presentation/
│       ├── server.ts                   # Express server class
│       ├── routes.ts                   # Root route aggregator
│       └── inventory/
│           ├── controller.ts           # Request handlers & business logic
│           └── routes.ts               # Inventory-specific route definitions
├── .env                                # Local environment variables (not committed)
├── .env.template                       # Environment variable template
├── tsconfig.json                       # TypeScript configuration
└── package.json
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [pnpm](https://pnpm.io/) v8 or higher

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

### 4. Start the development server

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

## API Reference

Base URL: `http://localhost:{PORT}/api`

### Fruit Model

```json
{
  "id": "string (uuid)",
  "name": "string",
  "quantity": "number"
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
  { "id": "1", "name": "Apple", "quantity": 100 },
  { "id": "2", "name": "Banana", "quantity": 150 },
  { "id": "3", "name": "Orange", "quantity": 200 }
]
```

---

#### Get a fruit by ID

```postman
GET /api/inventory/:id
```

**Response `200`**

```json
{ "id": "1", "name": "Apple", "quantity": 100 }
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

```json
{
  "name": "Mango",
  "quantity": 75
}
```

**Response `201`**

```json
{
  "id": "a3f2c1d4-...",
  "name": "Mango",
  "quantity": 75
}
```

**Response `400`** — validation error

```json
{ "error": "Name is required and must be a string" }
```

```json
{ "error": "Quantity is required and must be a non-negative number" }
```

---

#### Update a fruit

```postman
PUT /api/inventory/:id
Content-Type: application/json
```

**Request body** (all fields optional)

```json
{
  "name": "Green Mango",
  "quantity": 50
}
```

**Response `200`**

```json
{
  "id": "a3f2c1d4-...",
  "name": "Green Mango",
  "quantity": 50
}
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

**Response `204`** — No content

**Response `404`**

```json
{ "error": "Fruit not found" }
```

---

## Environment Variables

| Variable | Required | Type | Description |
| --- | --- | --- | --- |
| `PORT` | Yes | Port number | Port the HTTP server listens on |

---

## Architecture Overview

The project follows a **layered architecture**:

- **`config/`** — Centralizes and validates all environment variables using `env-var`, throwing at startup if any required variable is missing.
- **`presentation/server.ts`** — Contains the `Server` class responsible for initializing Express, registering middleware (`json`, `urlencoded`), mounting routes, and starting the HTTP listener.
- **`presentation/routes.ts`** — Top-level route aggregator that namespaces feature routes (e.g., `/api/inventory`).
- **`presentation/inventory/`** — Feature-scoped module with its own router and controller, keeping inventory logic fully isolated.

Path aliases (`@/*` → `src/*`) are configured via `tsconfig-paths` for cleaner imports.

---

## License

This project is licensed under the **ISC License**.
