# 🚀 LNIT Summit 2K26 – Official AI Chatbot

---

## 📌 Project Info

**Project Name:** Chatbot for College Summit  
**Purpose:** Official chatbot for LNIT Summit – 2026  
**Summit Website:** https://lendinit.lendi.edu.in/

---

## 🛠️ How Can I Run This Project Locally?

Make sure you have **Node.js (v18+)** installed.

```bash
# Step 1: Clone the repository
git clone https://github.com/sahith215/Chatbot-for-College-Summit.git

# Step 2: Navigate to the project directory
cd Chatbot-for-College-Summit

# Step 3: Install dependencies
npm install

# Step 4: Start development server
npm run dev
```
The app will run locally at:
````bash
http://localhost:5173
````

## 🔐 Environment Variables

Create a .env file in the root directory:
```
VITE_WEBHOOK_URL=https://your-n8n-production-webhook-url
```

⚠️ Do NOT commit your .env file to GitHub.

## Project Architecture
# 🔹 Frontend

- React + TypeScript

- Tailwind CSS

# 🔹 Backend

- n8n Workflow

- Google Gemini Chat Model

- Webhook-based architecture

 Flow
User → React UI → n8n Webhook → Gemini → Response → UI Render

# Technologies Used

- Vite

- React

- TypeScript

- Tailwind CSS

- ShadCN UI

- n8n

- Google Gemini API

#  Features ✨

- Structured AI responses

- Markdown rendering with proper formatting

- Typing animation

- Production webhook integration

- Fully responsive UI

- Official LNIT Summit 2K26 event data integration

# ⚙️ Backend Deployment

- Deploy n8n using:

- n8n Cloud

- Railway

- VPS / Docker

- AWS EC2

Ensure you use the Production Webhook URL in your frontend.
