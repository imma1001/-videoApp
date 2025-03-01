# 📽️ Video Sharing Youtube App

## 🚀 Project Overview

This is a **video-sharing Youtube application** built using **React Native** and **Appwrite**. Users can upload videos, manage their profiles, and browse trending content.

## 📌 Features

- 🔐 User Authentication (Sign Up, Login, Logout)
- 📤 Video Upload & Storage (Appwrite Storage API)
- 📺 View & Browse Latest Videos
- 🔍 Search Functionality
- 🏠 User Profile Management

## 🛠️ Tech Stack

- **Frontend:** React Native, Expo
- **Backend:** Appwrite

---

## ⚙️ Installation & Setup

### 1️⃣ **Clone the Repository**

```sh
git clone https://github.com/imma1001/-videoApp.git
cd -videoApp
```

### 2️⃣ **Install Dependencies**

```sh
npm install
```

### 3️⃣ **Set Up Environment Variables**

Create a `.env` file in the root directory and add your **Appwrite credentials**:

```env
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_DATABASE_ID=your_database_id
APPWRITE_USER_COLLECTION_ID=your_user_collection_id
APPWRITE_VIDEO_COLLECTION_ID=your_video_collection_id
APPWRITE_STORAGE_ID=your_storage_id
```

### 4️⃣ **Run the App**

```sh
npx expo start
```

---

## 🔑 Authentication Flow

- **Sign Up/Login**: Uses Appwrite's `account.createSession()` method.
- **User State**: Stored globally via Context API.
- **Logout**: Clears user state and redirects to login.

---


## 🔒 Security Considerations

✅ **Keep API Keys Secure**: Never expose **Appwrite project ID** or **API keys** in the frontend. Use environment variables.

✅ **Set Database Permissions**: Ensure database and storage **permissions** restrict access only to authenticated users.

✅ **Validate User Inputs**: Sanitize and validate all form inputs to prevent **XSS & SQL Injection**.

✅ **Use HTTPS**: Always communicate over **HTTPS** to protect user data.

---



