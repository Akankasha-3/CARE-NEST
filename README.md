# CareNest 🏡✨

CareNest is a service-based web platform that connects people with **Home Nursing, Adoption, and Companionship** services. The platform is designed to provide care, support, and companionship conveniently through an easy-to-use website.

---

## 📌 Features
- 🏥 **Home Nursing** – Hire trained nurses for in-home medical assistance.  
- 👶 **Adoption Services** – Access adoption-related guidance and resources.  
- 🤝 **Companionship** – Find trusted companions for emotional & personal support.  
- 📅 **Service Booking** – Schedule services with flexible timing.  
- 🌐 **Responsive UI** – Works across devices with a clean, modern interface.

---

## 🛠️ Tech Stack
- **Frontend**: React (Vite + TypeScript), TailwindCSS  
- **Backend**: Node.js, Express.js  
- **Database**: configure with `MONGO_URL` in env  
- **Deployment**: Render (Backend), Vercel  (Frontend)

---

## 📂 Folder Structure
    CareNest/
    ├── server/             # Backend server (Node.js + Express)
    │   └── server.js       # Main backend entry
    │
    ├── src/                # Frontend (React + Vite + TypeScript)
    │   ├── components/     # Reusable UI components (Navbar, Footer, Cards, etc.)
    │   ├── pages/          # App pages (Home, Services, Contact, etc.)
    │   ├── utils/          # Helper functions
    │   ├── App.jsx         # Root React component
    │   ├── main.jsx        # React entry file
    │   ├── index.css       # Global styles
    │   └── vite-env.d.ts   # TypeScript env defs
    │
    ├── index.html
    ├── package.json
    ├── Procfile            # (optional) deployment config: e.g., "web: node server/server.js"
    ├── README.md
    ├── eslint.config.js           
    ├── package-lock.json
    └── postcss.config.js
    ├── tsconfig.app.json            
    ├── tsconfig.json
    └── tsconfig.node.js
    └── vite.config.js
    

---

## ⚙️ Installation & Local Setup

1. Clone the repo:
    git clone https://github.com/Akankasha-3/CareNest.git
    cd CareNest

2. Backend (server):
    cd server
    npm install
    # Start backend (dev)
    node server.js
    # or use nodemon if available:
    # npx nodemon server.js

3. Frontend:
    cd ../
    npm install
    # Start dev server (Vite)
    npm run dev
    # Vite default: http://localhost:5173/

> If your frontend expects an API base URL, set it in the frontend env (see `.env` section).

---

## 🔐 Environment Variables (example)

**Backend (.env in server/):**
    MONGO_URL=your_mongodb_connection_string
    PORT=5000
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development

**Frontend (.env at project root or frontend root for Vite):**
    VITE_API_URL=http://localhost:5000
    # use VITE_ prefix for Vite to expose env vars to the client

---

## 🌍 Deployment Guide

### Deploy Backend (Render)
1. Create a new Web Service on Render and connect your GitHub repo.  
2. Set Root Directory to `server` (or the path where `server.js` lives).  
3. Build / Start commands:
    - Build Command: `npm install`
    - Start Command: `node server.js`
4. Add environment variables (MONGO_URI, JWT_SECRET, etc.).  
5. Deploy and note the backend URL (e.g., `https://carenest-backend.onrender.com`).

If using Procfile, set its content (in repo root or server folder) as:
    web: node server/server.js

### Deploy Frontend (Vercel)
1. Import the repo to Vercel.  
2. Framework: Vite.  
3. Build Command: `npm run build`  
4. Output Directory: `dist`  
5. Add environment variable `VITE_API_URL` pointing to your deployed backend URL.  
6. Deploy.

(Netlify is similar: connect repo, set build command `npm run build`, publish directory `dist`, and set env vars.)

---

## 🚀 Usage
1. Visit the live site or `http://localhost:5173/` locally.  
2. Browse services: **Home Nursing**, **Adoption**, **Companionship**.  
3. Use booking forms to request a service (if implemented).  
4. Admin / provider flows (if built) can manage service listings and bookings.

---

## 🔮 Future Enhancements
- Payment integration (Razorpay/Stripe)  
- Authentication & user/provider profiles (signup/login)  
- Real-time chat between users and caregivers  
- Admin dashboard for service management  
- PWA / Mobile app support  
- Improved search & filtering for services

---

## 🤝 Contributing
Contributions welcome:
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add ...'`
4. Push and open a Pull Request

Please follow linting rules and add tests where applicable.

---

## 📜 License
This project is licensed under the **MIT License**.

---

## ✉️ Contact
For questions or help, open an issue or reach out to me(korrayiakankasha@gmail.com).

---

**CareNest – Because everyone deserves care and companionship.**
