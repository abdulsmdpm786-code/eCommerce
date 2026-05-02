# 🎨 Frontend - React Authentication App

This repository contains the frontend client for the Full-Stack Authentication App. It is built using React and utilizes the Context API for seamless global state management, allowing users to log in, persist their sessions, and securely log out.

## ✨ Key Features
* **Global Auth State:** Uses React Context (`AuthContext`) to manage user sessions across all components without prop-drilling.
* **Persistent Login:** Reads and writes JSON Web Tokens (JWT) to `localStorage` to keep users logged in after page refreshes.
* **Protected Routing:** Dynamically renders UI elements (like the Logout button or user greetings) based on authentication status.
* **Modern UI/UX:** Fully styled using Tailwind CSS for a responsive, sleek, and polished interface.

## 🛠️ Tech Stack
* **Framework:** React.js (Vite / Create React App)
* **Routing:** React Router DOM
* **State Management:** React Context API
* **HTTP Client:** Axios
* **Styling:** Tailwind CSS

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation & Setup
1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/your-frontend-repo.git](https://github.com/your-username/your-frontend-repo.git)
   cd your-frontend-repo
