# Node.js RESTful API for User and Group Management

## 📝 Description

A modular, scalable and production-ready REST API built with **Node.js** and **TypeScript**, providing full CRUD for **users** and **groups**, and robust handling of **many-to-many relationships** (user-group associations) using raw **MySQL** queries (no ORM).

The project is structured with clean architecture principles, centralized error handling, schema validation, service-repository layering, and centralized logging for observability.

---

## 🛠️ Technologies

- Node.js (18+)
- Express.js
- TypeScript
- MySQL (`mysql2`)
- Joi (for validation)
- ts-node
- dotenv
- Nodemon (dev)
- Jest (unit testing)

---

## ⚙️ Requirements

- Node.js ≥ 18
- MySQL Server
- npm or yarn

---

## 🚀 Setup Instructions

### 1. Clone the repository
```bash
git clone <repository_url>
cd <repository_folder>
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Create environment variables
Create a `.env` file in the root:
```env
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=user_service
DB_PORT=3306
PORT=3000
DB_RESET_ON_EXIT=true  # optional: resets DB on shutdown in dev
```

### 4. Initialize the database
This command will:
- Create tables if they don't exist (`users`, `groups`, `user_groups`)
- Insert seed data if available
```bash
npm run db:init
```

Alternatively, to run schema or seed individually:
```bash
npm run db:setup   # create schema
npm run db:seed    # insert sample data
```

### 5. Start the server
```bash
npm run dev      # for development (with ts-node)
npm run build    # compile TypeScript
npm run start    # run compiled code
```

---

## 🛰️ API Endpoints

### 👤 Users
| Method | Endpoint     | Description            |
|--------|--------------|------------------------|
| POST   | `/users`     | Create a new user      |
| GET    | `/users`     | Get all users (paginated) |
| GET    | `/users/:id` | Get user by ID         |
| PUT    | `/users/:id` | Update user by ID      |
| DELETE | `/users/:id` | Delete user by ID      |

Supports pagination: `?page=1&pageSize=10`

---

### 👥 Groups
| Method | Endpoint      | Description           |
|--------|---------------|-----------------------|
| POST   | `/groups`     | Create a new group    |
| GET    | `/groups`     | Get all groups        |
| GET    | `/groups/:id` | Get group by ID       |
| PUT    | `/groups/:id` | Update group by ID    |
| DELETE | `/groups/:id` | Delete group by ID    |

---

### 🔗 User-Group Associations
| Method | Endpoint                          | Description                          |
|--------|-----------------------------------|--------------------------------------|
| POST   | `/users/:id/groups`               | Add user to group (`groupId` in body) |
| GET    | `/users/:id/groups`               | Get groups a user belongs to         |
| GET    | `/groups/:id/users`               | Get users in a group                 |
| DELETE | `/users/:id/groups/:groupId`      | Remove user from group               |

---

## 📊 Input Validation

- Implemented using **Joi**
- Centralized middleware: `validateBody`, `validateParams`, `validateQuery`
- Automatic schema validation for:
  - Request body
  - URL parameters (e.g. `:id`)
  - Query params (e.g. `?page`)

---

## ⚠️ Error Handling

All errors are processed through a centralized `errorHandler` middleware.
Custom error classes include:
- `ApiError` (base class)
- `NotFoundError`
- `AlreadyExistsError`
- `ConflictError`
- `AlreadyJoinedError`
- `NotJoinedError`

Standard error structure:
```json
{
  "code": "NOT_FOUND",
  "message": "User with ID 99 not found"
}
```

---

## 📈 Centralized Logging

All services and repositories use a shared `logger` utility (based on `console` or customizable).
Supports:
- `info`, `debug`, `warn`, `error` levels
- Logs DB operations, service actions, and shutdown flow

---

## 📊 Database Schema

Defined in [`schema.sql`](./src/database/schema.sql):
- `users (id, name, surname, birth_date, sex, created_at)`
- `groups (id, name, created_at)`
- `user_groups (user_id, group_id, joined_at)`

---

## ⚖️ Project Architecture

- `/routes` – Express routers
- `/controllers` – Request handlers
- `/services` – Business logic (with error throwing and logging)
- `/repositories` – Raw SQL queries to DB
- `/models` – TypeScript interfaces
- `/validations` – Joi schemas
- `/middlewares` – Validation, error handler
- `/errors` – Custom error classes
- `/utils` – Logger, pagination helpers

---

## 📅 Example Requests

```bash
# Create a user
curl -X POST http://localhost:3000/api/users   -H "Content-Type: application/json"   -d '{"name":"Alice", "surname":"Rossi", "birth_date":"1990-01-01", "sex":"F"}'
```

```bash
# Add user to group
curl -X POST http://localhost:3000/api/users/1/groups   -H "Content-Type: application/json"   -d '{"groupId": 2}'
```

---

## 🔬 Testing

Unit tests are written with **Jest** (services, repositories).  
Run with:
```bash
npm run test
```

Coming soon: integration tests with **Supertest**

---

## 🙌 Author

**Simone Fermani**

---

## 📄 License

MIT (or your preferred license)
