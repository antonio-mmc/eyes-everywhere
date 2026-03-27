# 👁️ EyesEveryWhere - Urban Monitoring & Management System

**EyesEveryWhere** is a comprehensive web platform developed for the monitoring and management of public infrastructure in the city of **Braga, Portugal**. This project was created as part of a university course to demonstrate full-stack development capabilities using modern web technologies.

[![Project Status: Completed](https://img.shields.io/badge/Status-Completed-success.svg)](#)
[![Tech Stack](https://img.shields.io/badge/Stack-Vue%20%7C%20Node%20%7C%20Express%20%7C%20Tailwind-blue.svg)](#)

---

## 🚀 Overview

The platform allows citizens to play an active role in city maintenance by reporting urban occurrences such as:
- 🚧 **Damaged Sidewalks** (Passeios Danificados)
- 🕳️ **Potholes** (Buracos na Estrada)
- 💡 **Public Lighting Issues** (Iluminação Pública)
- 🛑 **Missing or Damaged Signage** (Falta de Sinalização)

It also includes a dedicated **BackOffice** for technical audits, inspections, and monitoring of all reported incidents in real-time.

---

## ✨ Key Features

- **Interactive Reporting**: Map-based incident reporting with location selection.
- **Occurrence Management**: Users can track "My Occurrences" and view public reports.
- **Audit System**: Professional tools for technical inspections and historical audit tracking.
- **Admin Dashboard**: Comprehensive BackOffice for incident management and statistics.
- **Authentication**: Secure login system with JWT-based authorization.
- **Responsive Design**: Modern, mobile-first interface built with Tailwind CSS.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Vue.js 3](https://vuejs.org/) (Composition API)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Maps**: [Leaflet](https://leafletjs.com/) & [Google Maps API](https://developers.google.com/maps)
- **Routing**: [Vue Router](https://router.vuejs.org/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend
- **Environment**: [Node.js](https://nodejs.org/)
- **Framework**: [Express](https://expressjs.com/)
- **Security**: JWT (JSON Web Tokens) for authentication.

---

## 📂 Project Structure

- `FrontOffice/`: Public-facing landing page and static user interfaces.
- `BackOffice/`: Administrative interfaces for management and audits.
- `APP_PW/`: The core Vue.js 3 application (Single Page Application).
- `server.js`: The central Node.js server that integrates all components.

---

## ⚙️ How to Run

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)

### Local Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Access the project in your browser:
   - **Public Site**: `http://localhost:3000/`
   - **Vue Application**: `http://localhost:3000/app`

---

## 🎓 What I Learned

- **Full-Stack Orchestration**: Integrating a static frontend, a modern SPA (Vue.js), and a Node.js backend into a single cohesive project.
- **Geospatial Features**: Implementing interactive maps and geocoding services for urban incident reporting.
- **State & Routing**: Managing complex application states with Pinia and nested routing for administrative workflows.
- **Professional UI/UX**: Applying modern design principles using Tailwind CSS to create a premium-feel interface.

---

## 🔮 Future Improvements

- **Mobile App Integration**: Developing a native mobile version for real-time reporting on the go.
- **AI-Powered Categorization**: Using image recognition to automatically categorize incidents from uploaded photos.
- **Real-time Notifications**: Implementing WebSockets for instant updates on incident status changes.
- **Enhanced Analytics**: Adding more visualization tools for city planners to identify high-priority areas.

---

Created with ❤️ by **[Your Name/Group G304]** as a university project.
