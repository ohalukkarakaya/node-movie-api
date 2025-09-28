# 🎬 Movies API

This project is a simple **RESTful API** built with Node.js and Express for managing movies and directors.  
It demonstrates how to implement CRUD operations, authentication, and querying data with MongoDB.

---

## 🚀 Features
- User registration & authentication with JWT  
- CRUD operations for **movies** and **directors**  
- Query movies between specific years  
- Fetch **Top 10 movies** by IMDB score  

---

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ohalukkarakaya/node-movie-api.git
   cd node-movie-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root folder with the following variables:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/moviesdb
   JWT_SECRET=yourSecretKey
   ```

4. Start the server:
   ```bash
   npm start
   ```
   The API will run at `http://localhost:3000/`

---

## 👤 Authentication

Before using movie/director endpoints, you must **register** and **login** to get a token.

### Register
```http
POST /register
Content-Type: application/json

{
  "username": "alice",
  "password": "1234"
}
```

### Authenticate
```http
POST /authenticate
Content-Type: application/json

{
  "username": "alice",
  "password": "1234"
}
```

✅ **Response**
```json
{
  "status": true,
  "token": "eyJhbGciOiJIUzI1..."
}
```

Use this token in the `Authorization` header as `Bearer <token>` for all protected routes.

---

## 🎥 Movie Routes

| Route | Method | Body | Description |
|-------|--------|------|-------------|
| `/api/movies` | `GET` | – | List all movies |
| `/api/movies` | `POST` | `{ "title": "Inception", "category": "Sci-Fi", "country": "USA", "year": 2010, "director": "id", "imdb_score": 8.8 }` | Create a new movie |
| `/api/movies/:id` | `GET` | – | Get a single movie |
| `/api/movies/:id` | `PUT` | `{ "title": "New Title" }` | Update a movie |
| `/api/movies/:id` | `DELETE` | – | Delete a movie |
| `/api/movies/top10` | `GET` | – | Get the top 10 movies |
| `/api/movies/between/:start_year/:end_year` | `GET` | – | List movies between two years |

---

## 🎬 Director Routes

| Route | Method | Body | Description |
|-------|--------|------|-------------|
| `/api/directors` | `GET` | – | List all directors |
| `/api/directors` | `POST` | `{ "name": "Christopher", "surname": "Nolan", "bio": "British-American filmmaker" }` | Create a new director |
| `/api/directors/:id` | `GET` | – | Get a single director |
| `/api/directors/:id` | `PUT` | `{ "bio": "Updated bio" }` | Update a director |
| `/api/directors/:id` | `DELETE` | – | Delete a director |

---

## 📊 Example Flow (Step by Step)

1. Register a new user (`POST /register`)  
2. Authenticate to get a JWT token (`POST /authenticate`)  
3. Add a new director (`POST /api/directors`)  
4. Add a new movie with that director’s ID (`POST /api/movies`)  
5. Fetch the Top 10 movies (`GET /api/movies/top10`)  

---

## 🌐 Live Demo
Deployed on Heroku:  (deprecated)
👉 [https://node--basic--back-end--server.herokuapp.com/](https://node--basic--back-end--server.herokuapp.com/)

---

## 📌 Notes
- This documentation is updated iteratively as new features are added.  
- Future improvements: error handling section, sample Postman collection, and architecture diagram.
