                                                                              Ticket Booking Webpage By Krishnav Kishor
A. Deployment Explanation (Step-by-Step)

# 1.Project Setup

Folder Structure

                  ticket-booking/
                  ticket-booking-backend/
                  │
                  ├─ package.json ← already created
                  ├─ server.js ← main server file
                  ├─ db.js ← database connection
                  ├─ .env ← environment variables
                  ├─ routes/
                  │ ├─ admin.js ← admin APIs
                  │ └─ booking.js ← user booking APIs
                  ├─ models/
                  │ └─ createTables.js ← automatically create tables
                  └─ README.md
                  ticket-booking-frontend/
                  src/
                  │
                  ├─ components/
                  │ ├─ AdminDashboard.tsx
                  │ ├─ AdminDashboard.css
                  │ ├─ ShowList.tsx
                  │ ├─ BookingPage.tsx
                  │ ├─ BookingPage.css
                  │ ├─ SeatGrid.tsx
                  │ └─ SeatGrid.css
                  ├─ context/
                  │ └─ AppContext.tsx
                  ├─ api/
                  │ └─ api.ts
                  ├─ Navbar/
                  │ ├─ Navbar.tsx
                  │ └─ Navbar.css
                  ├─ Footer/
                  │ ├─ Footer.tsx
                  │ └─ Footer.css
                  │
                  ├─ App.tsx
                  ├─ index.tsx
                  
• Backend and frontend are separate folders.
• This separation helps with independent deployment and easier environment configuration.

# Dependencies

Backend (Node.js + Express + PostgreSQL):
  • express
  • pg
  • dotenv
  • cors
  
Frontend (React + TypeScript):
  • react
  • react-dom
  • react-scripts / Vite
  • TypeScript
  
1. Installation Steps

1. Navigate to backend folder:

```
cd ticket-booking-backend
npm install
```

2. Navigate to frontend folder:
```
cd ../ticket-booking-frontend
npm install
```
3. Start backend locally (for testing):
```
npm start
```
4. Start frontend locally (for testing):
```
npm start
```
# 2. Environment Variables

Backend

.env file in ticket-booking-backend:
     
      ```
      DB_USER=ticketdb_z7xv_user
      DB_PASS=yYzh3Amx0gVGLbigLLQRecjEwvf3sg4c
      DB_HOST=dpg-d4u07na4d50c73b7qvlg-a.oregon-postgres.render.com
      DB_PORT=5432
      DB_NAME=ticketdb_z7xv
      NODE_ENV=production
      ```
• These variables were also added in Render → Environment Variables for deployment.
• Used for PostgreSQL connection.

Frontend

    • .env file in ticket-booking-frontend:
```
REACT_APP_BASE_URL=https://ticket-booking-webpage.onrender.com
```
    • This points frontend API calls to the live backend.
    • Added in Vercel → Environment Variables for deployment.

# 3. Backend Deployment

Platform
    • Render — chosen for Node.js + PostgreSQL support.

# Deployment Steps

1. Push backend code to GitHub repository.
2. Create a New Web Service on Render:
    • Root Directory: ticket-booking-backend
    • Build Command: npm install
    • Start Command: npm start
3. Add environment variables in Render (same as .env).
4. Render automatically installs dependencies, runs the build, and starts the server.

# Database Connectivity

    • Render PostgreSQL used.
    • Backend connects using:
          const pool = new Pool({
           user: process.env.DB_USER,
           host: process.env.DB_HOST,
           database: process.env.DB_NAME,
           password: process.env.DB_PASS,
           port: process.env.DB_PORT,
           ssl: { rejectUnauthorized: false },
          });
          
    • Tables (shows, bookings) created on first run.
    Testing APIs
    • Tested via Postman, browser, and terminal (curl):
    curl https://ticket-booking-webpage.onrender.com/booking
    • Verified that data is returned correctly.

# 4. Frontend Deployment

Platform
• Vercel

Build Process

1. Navigate to frontend folder: ticket-booking-frontend

2. Install dependencies:
npm install

3. Build frontend:
npm run build

• Creates a build/ folder ready for deployment.

# Setting Environment Variables

• REACT_APP_BASE_URL=https://ticket-booking-webpage.onrender.com added in Vercel →
Environment Variables.

# Updating API Base URL

• All API calls in api.ts and AppContext.tsx updated:
const BASE_URL = process.env.REACT_APP_BASE_URL;
• Ensures frontend talks to the live backend.

# 5. Connecting Frontend & Backend

    • Frontend fetches data from backend using live API URL:

Example endpoints:
```
GET https://ticket-booking-webpage.onrender.com/booking
GET https://ticket-booking-webpage.onrender.com/admin/shows
POST https://ticket-booking-webpage.onrender.com/booking/book/:id
```
    • Verified live API calls in browser DevTools → Network tab.
    • API calls return real-time data from Render PostgreSQL.

# 6. Validation

All Features Working

    • Create Show
    • Update Show
    • Delete Show
    • Book Seats
    • View Bookings
    • Frontend interacts seamlessly with backend.

# Final Deployed URLs

|Component      |     URL|
|-------------  | -----------------------------------------------               
|Backend        |     https://ticket-booking-webpage.onrender.com  |
|Frontend       |     https://ticket-booking-frontend.vercel.app   |
 
# B. Full Product Explanation (Feature Walkthrough)  

# 1. Product Objective

Problem Solved

Managing bookings, seats, and show availability manually can be error-prone.
This product solves the problem by providing:

    • A centralized system to create shows
    • Track available / booked seats
    • Allow customers to book seats online
    • Maintain booking records in a database

End Users
1. Admin

   • Creates shows
    • Updates shows
    • Deletes shows
    • Monitors bookings

3. Customers

   • Views available shows
    • Books seats for a selected show
    • Gets live status of availability

# 2. Architecture Overview

Tech Stack

|Layer          |  Technology      |
| ------------- | ------------- |
|Frontend       |  React + TypeScript |
|Backend         | Node.js + Express   |
|Database        | PostgreSQL (Render)  |
|Deployment       |Frontend: Vercel / Backend: Render  |
|Version Control | Git + GitHub |

# High-Level Architecture

Frontend (React + TS) <-----> Backend API (Express) <-----> PostgreSQL Database
             |                       |                             |
     User Interface            Business Logic                Persistent Data

# Key Libraries Used

# Frontend
    • React (UI framework)
    • TypeScript (type safety)
    • Context API (state management)
    • Fetch API (HTTP requests)
    
# Backend

    • Express (routing)
    • pg (postgresql client)
    • cors (cross-origin)
    • dotenv (environment variables)

Database

    • Render PostgreSQL (hosted)
    
# Why This Architecture?

    • React gives a fast, scalable frontend with reusable components.
    • Express provides a clean and simple API structure.
    • PostgreSQL ensures reliable relational data handling (ideal for seats, bookings).
    • Render + Vercel give seamless cloud deployment, CI/CD, environment variables, and auto-scaling.

# This combination ensures:
    • High performance
    • Easy scalability
    • Clear separation of concerns
    • Great developer experience
    
# 3. Feature-by-Feature Demo

Below is a full demonstration of every feature your product includes.

# A. Show Management (Admin)

# 1. Create Show
• Admin enters:
    • Show name
    • Start time
    • Total seats

Flow:

1. Form submission →
2. Frontend sends POST request:
3. POST /admin/create-show
4. Backend validates and inserts a new row into the shows table.
5. Frontend updates UI.

# 2. Update Show
    • Admin selects a show and edits details.

API:
PUT /admin/update-show/:id

# 3. Delete Show
    • Admin removes an incorrect or outdated show.
   
API:
DELETE /admin/delete-show/:id

# B. Booking System (User)

# 1. View Available Shows

Fetches all live shows:

GET /admin/shows

Displays:
• Name
• Time
• Total seats
• Available seats

# 2. Book Seats

User chooses number of seats.

Flow:

1. Frontend sends POST:
2. POST /booking/book/:id
3. Backend checks:
    • Is show valid?
    • Is enough seat available?
4. If yes:
    • Inserts into bookings
    • Reduces available_seats
5. Returns booking confirmation.

# 3. View All Bookings
 
Admin can check booking details:
GET /booking

Response includes:
    • show_id
    • seats booked
    • status
    • timestamp

C. Error Handling

Handled cases:
    • Insufficient seats → Shows error message
    • Invalid show ID → Returns 400
    • Missing input fields → Validation errors
    • Database connection failures → Logged and returned gracefully

Frontend displays user-friendly messages instead of breaking.

# 4. Innovation (Very Important)

# Seat Validation Logic

implemented custom logic ensuring:
    • No overbooking
    • Atomic seat deduction
    • Prevents race conditions
This is essential in real booking systems.

# Two-Way Connected Architecture

built a real full-stack system where:
    • Frontend calls backend
    • Backend reads/writes to PostgreSQL
    • Database updates reflect instantly on UI
    

# Dynamic State Management

Using React Context API:
    • Shows and bookings sync automatically
    • No page refresh required
    • Components update in real time
   
# Cloud-Based DB Migration

exported a local PostgreSQL DB → uploaded it to Render → connected backend → connected
frontend.
Handling a cloud database is a real-world skill many of us skip.

# 6. Testing & Debugging

# Testing Performed

API Testing using Browser & Postman
Checked every endpoint:
    • GET shows
    • GET bookings
    • POST book seats
    • PUT update
    • DELETE show
   
# Frontend Testing
Checked:
    • Forms
    • Buttons
    • Data rendering
    • Error messages
   
# Network Tab Testing (Browser DevTools)
Verified:
    • Correct backend URL
    • Successful API calls
    • Response times
    • CORS stability
   
# Database Testing (Render Dashboard)

    • Verified rows inserted
    • Checked table structure
    • Verified updates/deletes

# Challenges Faced & Solutions

|Problem                                    | Solution                                          |
|--------------------------------------     | --------------------------------------------     |
|Database connection error (ECONNRESET)      |Enabled SSL and corrected DB host URL             |
|CORS issues                                 |Added CORS middleware in backend                  |
|Environment variables not loading on Vercel |Added REACT_APP_BASE_URL in Vercel settings      |   
|Local vs Production URLs                    |Used env variables instead of hardcoded localhost  |
| Deployment failure                         | Fixed build commands and root directory settings |

# Final Deliverables

| Component                    |  URL                                           |
|  --------------------------- |  --------------------------------------------  |
| Frontend (Vercel)            |  Your live Vercel URL here                     |
| Backend (Render)             |  https://ticket-booking-webpage.onrender.com   |
| Database (Render PostgreSQL) |  Live, cloud-hosted                            |
