🛠️ TalabNow – React + Vite
TalabNow is a service-request platform built using React and Vite. The app allows users to browse available services and submit requests, while administrators can manage services, approve or reject requests, and track system operations.

📌 Project Overview
TalabNow is a simple service management system with two roles:

User:

Browse available services

Submit service requests

View and cancel their submitted requests

Admin:

Add new services

View all user requests

Approve or reject requests with reasons

Manage service list

🧰 Tech Stack
React – UI development

Vite – Lightning-fast development server

React Router – Page routing

Context API – Global state management

Tailwind CSS – Styling (if applicable)

localStorage – To store user state temporarily

🚀 Getting Started
Clone the repository and run the project locally:

bash
Copy
Edit
git clone https://github.com/yourusername/talabnow.git
cd talabnow
npm install
npm run dev
🧱 Folder Structure
bash
Copy
Edit
src/
├── components/        # Reusable components like Navbar, Card, etc.
├── pages/             # Pages like Home, Login, Dashboard, etc.
├── context/           # Global state context for auth and services
├── utils/             # Utility functions (API helpers, etc.)
├── App.jsx
├── main.jsx

📖 Features Summary
Feature	User	Admin
Browse Services	✅	✅
Request Service	✅	❌
Cancel Request	✅	❌
Add Services	❌	✅
Approve/Reject Requests	❌	✅
View Rejection Reason	✅	✅

🎯 Future Improvements
Add authentication with JWT

Notifications for request status changes

Add role-based dashboard layouts

