# 🚀 Backend CRUD API - Express & MongoDB

Project ini adalah backend sederhana untuk belajar konsep CRUD (Create,
Read, Update, Delete) menggunakan:

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- CORS

Project ini dibuat sebagai latihan memahami arsitektur backend dan
struktur folder yang rapi.

---

## 📦 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- CORS

---

## 📁 Project Structure

    .
    ├── bin/
    │   └── www
    │
    ├── config/
    │   └── db_connection.js
    │
    ├── controllers/
    │   ├── controllers.js
    │   └── todoController.js
    │
    ├── models/
    │   ├── productModels.js
    │   └── todosModel.js
    │
    ├── routes/
    │   ├── index.js
    │   ├── product.js
    │   ├── todos.js
    │   └── users.js
    │
    ├── public/
    ├── views/
    │   ├── error.jade
    │   ├── index.jade
    │   └── layout.jade
    │
    ├── app.js
    ├── package.json
    └── .env

> Folder `data/` diabaikan karena digunakan saat awal belajar
> menggunakan JSON file sebelum menggunakan MongoDB.

---

## 🧠 Architecture Pattern

Project ini menggunakan pola MVC:

- **Model** → Mengatur schema dan interaksi dengan MongoDB
- **Controller** → Mengatur logic bisnis
- **Route** → Mengatur endpoint API
- **Config** → Konfigurasi database
- **Bin/www** → Entry point server

---

## ⚙️ Environment Setup

Buat file `.env` di root project:

    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/namadatabase

Jika menggunakan MongoDB Atlas:

    MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/namadatabase

---

## 🧑‍💻 Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/username/backend-crud.git
cd backend-crud
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run Server

```bash
npm start
```

atau jika menggunakan nodemon:

```bash
npm run dev
```

Server akan berjalan di:

    http://localhost:5000

---

## 🌍 API Endpoints Example

### 📝 Todos

    GET    /todos
    GET    /todos/:id
    POST   /todos
    PUT    /todos/:id
    DELETE /todos/:id

### 📦 Products

    GET    /product
    POST   /product
    PUT    /product/:id
    DELETE /product/:id

---

## 📊 Example Request Body (POST)

```json
{
  "title": "Belajar Backend",
  "completed": false
}
```

---

## 🔌 Database Connection

Database connection dikonfigurasi di:

    config/db_connection.js

Menggunakan Mongoose untuk koneksi ke MongoDB.

---

## 🎯 Learning Goals

Project ini dibuat untuk memahami:

- Struktur backend yang scalable
- Konsep MVC
- RESTful API
- Integrasi MongoDB dengan Mongoose
- Error handling
- Middleware di Express

---

## 🚀 Future Improvement

- Authentication (JWT)
- Role-based authorization
- Validation menggunakan Joi / Zod
- Pagination
- Centralized error handler
- Logging system

---

## 👨‍💻 Author

Project ini dibuat sebagai latihan belajar backend development
menggunakan Node.js dan Express.
