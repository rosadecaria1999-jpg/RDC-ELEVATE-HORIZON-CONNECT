# 📘 Elevate Horizon API — README

- [📘 Elevate Horizon API — README](#-elevate-horizon-api--readme)
  - [📁 Project Structure](#-project-structure)
  - [🚀 Features](#-features)
  - [📦 Installation \& Setup](#-installation--setup)
    - [1️⃣ Clone/download the repository](#1️⃣-clonedownload-the-repository)
    - [2️⃣ Install dependencies](#2️⃣-install-dependencies)
      - [🛡 Handling “High Severity Vulnerabilities” During NPM Install](#-handling-high-severity-vulnerabilities-during-npm-install)
    - [3️⃣ Configure the environment file](#3️⃣-configure-the-environment-file)
    - [4️⃣ Seed the database (creates tables + events + sample registrations)](#4️⃣-seed-the-database-creates-tables--events--sample-registrations)
    - [5️⃣ Start the API server](#5️⃣-start-the-api-server)
  - [🧪 Testing the API (VSCode REST Client)](#-testing-the-api-vscode-rest-client)
  - [📱 Using This API Inside Your Expo Project](#-using-this-api-inside-your-expo-project)
  - [🔗 Integrating Expo + This API (Running Both)](#-integrating-expo--this-api-running-both)
    - [Option A — Run both manually in separate terminals](#option-a--run-both-manually-in-separate-terminals)
      - [Folder structure](#folder-structure)
      - [Terminal 1: Start API](#terminal-1-start-api)
      - [Terminal 2: Start Expo app](#terminal-2-start-expo-app)
    - [Option B — Add scripts in the Expo project to run both concurrently](#option-b--add-scripts-in-the-expo-project-to-run-both-concurrently)
      - [Folder structure example](#folder-structure-example)
  - [🌐 Connecting Expo → API](#-connecting-expo--api)
  - [📡 Offline-First Requirement (IMPORTANT)](#-offline-first-requirement-important)
    - [✔ Must work offline](#-must-work-offline)
    - [✔ All filtering must be local](#-all-filtering-must-be-local)
    - [✔ Registrations may require Internet unless teacher instructs otherwise](#-registrations-may-require-internet-unless-teacher-instructs-otherwise)
  - [🔧 Troubleshooting](#-troubleshooting)
    - [“API not reachable” in Expo](#api-not-reachable-in-expo)
    - [“Database locked”](#database-locked)
  - [📄 Useful Commands Summary](#-useful-commands-summary)
  - [🎯 Student Deliverables (Assessment Quick Notes)](#-student-deliverables-assessment-quick-notes)
  - [📚 License](#-license)


This project provides the **Node.js + Express + SQLite API** for the **Elevate Horizon Connect** mobile app (Cert IV Programming – Mobile Development Project).

- ✔ Full project instructions for students
- ✔ How to set up & run the API project
- ✔ How to integrate the API with an Expo mobile project
- ✔ How to run both API + Expo concurrently
- ✔ Includes sample scripts for `package.json` in the Expo project
- ✔ Clear steps for GitHub Codespaces, GitHub Workspace, or local machines
- ✔ Offline-first notes for mobile app

Students will use this API as the external data source for the Expo (React Native) mobile app.

This API supplies:

- Event listings
- Event filtering
- Event details
- A registration endpoint
- User registration lookup
- (Optional) admin endpoints for CRUD
- Example dataset

---

## 📁 Project Structure

```bash
elevate-horizon-api/
├─ package.json
├─ .env.example
├─ app.js
├─ database.js
├─ seed.js
├─ api.http
├─ database.sqlite        # created after running seed (gitignore recommended)
├─ /models
│  ├─ index.js
│  ├─ event.model.js
│  └─ registration.model.js
├─ /routes
│  ├─ events.js
│  └─ registrations.js
├─ /controllers           # optional --- controllers can be added later
├─ /migrations            # optional (not used here)
└─ README.md
```

---

## 🚀 Features

- Express REST API
- SQLite local database (using Sequelize ORM)
- Pre-seeded event dataset
- Sample registrations
- CORS enabled for Expo
- Ready for VSCode REST client testing
- Offline-first support

---

## 📦 Installation & Setup

### 1️⃣ Clone/download the repository

```bash
git clone <your-api-repo-url>
cd elevate-horizon-api
```

> Or download the zip file and extract it

---

### 2️⃣ Install dependencies

```bash
npm install
```

Here is the **update paragraph only**, as requested:

---

#### 🛡 Handling “High Severity Vulnerabilities” During NPM Install

When installing dependencies, you may see messages such as:

```bash
3 high severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force
```

This is common when working with older packages or academic starter projects. **Do NOT immediately run `npm audit fix --force`**, as it may upgrade packages to incompatible versions and break the project.
For this assessment, you can safely ignore these warnings unless your app is not functioning. If something breaks after installation, first try:

```
npm audit fix
```

Only use `--force` **as a last resort** and only if instructed, because it may introduce breaking changes.

---

### 3️⃣ Configure the environment file

You may adjust:

```data
PORT=3000
DB_FILE=./database.sqlite
NODE_ENV=development
```

---

### 4️⃣ Seed the database (creates tables + events + sample registrations)

```bash
npm run seed
```

This will:

- Create tables
- Insert events
- Add several demo registrations
- Create `database.sqlite`

---

### 5️⃣ Start the API server

```bash
npm start
```

Or during development with auto-reloading:

```bash
npm run dev
```

---

## 🧪 Testing the API (VSCode REST Client)

The file **api.http** is included.
Open it in VSCode → Click **“Send Request”** above any block.

Example:

```http
GET http://localhost:3000/api/events
```

---

## 📱 Using This API Inside Your Expo Project

Students are expected to use this API as their backend data source.

Your Expo project will:

1. Fetch event data from the API **once** at startup
2. Store all events in local storage (AsyncStorage or MMKV)
3. Perform filtering *locally* (offline-first requirement)
4. Only use the API for:

   - Initial download of events
   - Event details (optional)
   - Submitting registrations

---

## 🔗 Integrating Expo + This API (Running Both)

### Option A — Run both manually in separate terminals

#### Folder structure

```bash
project-root/
├─ elevate-horizon-app/      (Expo Project)
└─ elevate-horizon-api/      (API Project - this repo)
```

#### Terminal 1: Start API

```bash
cd elevate-horizon-api
npm run dev
```

#### Terminal 2: Start Expo app

```bash
cd elevate-horizon-app
npx expo start
```

---

### Option B — Add scripts in the Expo project to run both concurrently

- Extract api project into sub-folder **server** inside your **Expo project**
- Inside your **Expo project package.json**, add the following scripts:

```json
"scripts": {
  "web": "expo start --web",
  "android": "expo start --android",
  "ios": "expo start --ios",

  "inst": "npm install && cd server && npm install",
  "seed": "cd server && npm install && npm run seed",
  "start:server": "cd server && npm start",
  "dev": "concurrently \"npm run web\" \"npm run start:server\""
}
```

Where:

#### Folder structure example

```bash
elevate-horizon-app/        (Expo Project)
└─ server/                  (API Project - this repo)
```

Students can do:

```bash
npm run dev
```

This launches:

- The **Expo app**, and
- The **API backend** at the same time

---

## 🌐 Connecting Expo → API

Expo runs on a different port/device.
Find your machine’s LAN IP:

```bash
ipconfig  (Windows)
ifconfig  (Mac/Linux)
```

Example:

```bash
IPv4 Address: 192.168.1.50
```

Use this in your Expo app:

```js
const API_BASE = "http://192.168.1.50:3000/api";
```

Test:

```js
const events = await fetch(`${API_BASE}/events`).then(res => res.json());
```

👉 **Do not use localhost on mobile devices**
Use the LAN IP of your computer.

---

## 📡 Offline-First Requirement (IMPORTANT)

According to the assessment, the mobile app:

### ✔ Must work offline

→ All events must be fetched **once** and saved locally.

### ✔ All filtering must be local

→ No API calls for filtering.

### ✔ Registrations may require Internet unless teacher instructs otherwise

→ Registration POST is designed for online use.
→ App should display a “Retry later” state if no network is available.

---

## 🔧 Troubleshooting

### “API not reachable” in Expo

Check:

- API running (`npm run dev`)
- System firewall
- Using LAN IP instead of localhost
- Phone on same WiFi network

### “Database locked”

Restart server:

```bash
npm restart
```

---

## 📄 Useful Commands Summary

| Command                         | Purpose                         |
| ------------------------------- | ------------------------------- |
| `npm install`                   | Install backend dependencies    |
| `npm run seed`                  | Reset DB + seed events          |
| `npm start`                     | Start server                    |
| `npm run dev`                   | Start server with auto reload   |
| `npm run web` *(Expo)*          | Start Expo web                  |
| `npm run start:server` *(Expo)* | Start backend from Expo folder  |
| `npm run dev` *(Expo)*          | Run Expo + Backend concurrently |

---

## 🎯 Student Deliverables (Assessment Quick Notes)

Your Expo Mobile App must include:

- Screens for **Home**, **Events**, **Event Details**, **Register Form**, **Profile/My Registrations**, **Offline View**
- Local storage for filtering events
- Working API integration
- UI design matching your wireframes
- Testing using the provided API

---

## 📚 License

MIT — Use freely for educational purposes.

---
