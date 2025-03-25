# Node.js RESTful API for User and Group Management

## 🧾 Description

A modular and production-ready REST API built with **Node.js** and **TypeScript**, providing full CRUD for **users** and **groups**, and robust management of **many-to-many relationships** (user-group associations) — all using raw **MySQL** queries (no ORM).

Built with a clean architecture, strong input validation, and structured error handling.

---

## 🛠 Technologies

- Node.js (18+)
- Express.js
- TypeScript
- MySQL (`mysql2`)
- Joi (for validation)
- Nodemon (dev)
- ts-node
- dotenv

---

## ⚙️ Requirements

- Node.js ≥ 18
- MySQL Server
- npm or yarn

---

## 🚀 Setup Instructions

1. **Clone the repository**

```bash
git clone <repository_url>
cd <repository_folder>
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up the environment variables**

Create a `.env` file in the root:

```env
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=user_service
DB_PORT=3306
PORT=3000
```

4. **Set up the database**

```bash
npm run db:setup
```

This will execute the SQL schema and create the necessary tables (`users`, `groups`, `user_groups`).

Alternatively, you can run the schema manually:

```bash
mysql -u root -p user_service < database/schema.sql
```

5. **Start the server**

```bash
npm run dev      # for development with nodemon
npm run build    # transpile TypeScript
npm run start    # run compiled code (after build)
```

---

## 📡 API Endpoints

### 👤 Users

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| POST   | `/users`         | Create a user            |
| GET    | `/users`         | List users (paginated)   |
| GET    | `/users/:id`     | Get user by ID           |
| PUT    | `/users/:id`     | Update user              |
| DELETE | `/users/:id`     | Delete user              |

📌 Supports query params: `?page=1&pageSize=10`  
📌 Body is validated using Joi

---

### 👥 Groups

| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
| POST   | `/groups`        | Create a group      |
| GET    | `/groups`        | List all groups     |
| GET    | `/groups/:id`    | Get group by ID     |
| PUT    | `/groups/:id`    | Update group        |
| DELETE | `/groups/:id`    | Delete group        |

---

### 🔗 User-Group Relationships

| Method | Endpoint                          | Description                          |
|--------|-----------------------------------|--------------------------------------|
| POST   | `/users/:id/groups`               | Add user to group (`groupId` in body)|
| GET    | `/users/:id/groups`               | Get groups a user belongs to         |
| GET    | `/groups/:id/users`               | Get users in a group                 |
| DELETE | `/users/:id/groups/:groupId`      | Remove user from a group             |

---

## 📦 Input Validation

- All input is validated using **Joi**
- Middlewares used:
  - `validateBody`
  - `validateParams`
  - `validateQuery`
- Examples:
  - `POST /users`: requires `name`, `surname`, `birth_date`, `sex`
  - `POST /users/:id/groups`: requires `groupId` in body

---

## 📄 Database Schema

Tables:
- `users (id, name, surname, birth_date, sex, created_at)`
- `groups (id, name, created_at)`
- `user_groups (user_id, group_id, joined_at)`

Defined in: [`schema.sql`](./database/schema.sql)

---

## 📄 API Examples

```bash
# Create a user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Mario", "surname":"Rossi", "birth_date":"1990-01-01", "sex":"M"}'
```

```bash
# Add user to group
curl -X POST http://localhost:3000/users/1/groups \
  -H "Content-Type: application/json" \
  -d '{"groupId": 2}'
```

---

## 🧪 Testing

_Coming soon_  
Planned stack: **Jest** + **Supertest**

---

## 🙌 Author

Simone Fermani

---

## 📄 License

MIT (or specify your license)
