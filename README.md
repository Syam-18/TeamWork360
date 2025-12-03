#  Project Manager — Vue 3 + Vite

A simple and fast project/task management app built with **Vue 3, Pinia, Vue Router, TailwindCSS, Axios**, and a **JSON Server backend** for mock API.

This project has modular architecture, clean UI components, CRUD operations, and state management.



##  Tech Stack

* **Vue 3 (Composition API)**
* **Vite**
* **Pinia** (state management)
* **Vue Router**
* **Axios**
* **TailwindCSS**
* **Chart.js**
* **JSON Server** (mock backend)


## 📁 Project Structure


src/
  components/
  pages/
  stores/
  router/
  services/

mock/
  db.json


##  Setup Instructions

### 1️. Clone the Repository
* git clone <repo-url>
* cd <project-folder>


### 2️. Install Dependencies
* npm install


### 3️. Start JSON Server (Mock API)
* Make sure to run this command before starting the frontend
* npx json-server --watch mock/db.json --port 5000


### This provides endpoints like:

* `GET /projects`
* `GET /tasks`


### 4. Start the Frontend
* npm run dev


### Features Completed

###  Mock Authentication

* Login page
* Email/password validation
* Auth persisted using localStorage
* Router guards protected routes


###  Projects Module

* Create / Edit / Delete projects
* Auto-calculated progress
* Grid list layout
* Connected to JSON Server


###  Tasks Module

* Per-project task list
* Add / edit / delete tasks
* Status change (Todo → Doing → Done)
* Live progress updates via Pinia


###  Dashboard & Analytics

* Total projects
* Total tasks
* Upcoming deadlines
* Task distribution (Pie chart)
* Progress bars + clean layout

