Employee Management System (EMS)

A dynamic Form-based Employee Management System built with:
🔹 Django 6 + Django REST Framework
🔹 JWT Authentication (SimpleJWT)
🔹 React (Vite + TypeScript)
🔹 Dynamic Form Builder
🔹 Searchable Employee Records

Features:

🔐 Authentication

User Registration
JWT Login
Token Refresh
Protected APIs

📝 Dynamic Form Builder

Create custom forms
Add dynamic fields (Text, Number, Date, Password)
Edit forms
Delete forms
Edit/Delete fields

👨‍💼 Employee Management

Create employee based on selected form
Dynamic field value storage
Search employees by label & value
Update employee
Delete employee

🎨 Frontend

Futuristic UI
Dashboard
Protected Routes
Edit Mode Support
Search Support

Backend Setup (Django + DRF)
1️⃣ Create Virtual Environment
python3 -m venv venv
source venv/bin/activate

2️⃣ Install Dependencies
pip install django djangorestframework djangorestframework-simplejwt

3️⃣ Run Migrations
python manage.py makemigrations
python manage.py migrate

4️⃣ Create Superuser
python manage.py createsuperuser

5️⃣ Run Server
python manage.py runserver 0.0.0.0:8000

Backend runs at:
http://127.0.0.1:8000/


Frontend Setup (React + Vite + TypeScript)
1️⃣ Create Frontend
npm create vite@latest frontend

Select:
React
TypeScript

2️⃣ Install Dependencies
npm install
npm install axios react-router-dom
3️⃣ Start Development Server
npm run dev

Frontend runs at:

http://localhost:5173



Postman Testing:

Import provided Postman Collection

Set Environment:

base_url = http://127.0.0.1:8000/api

Use {{access_token}} for Authorization

https://.postman.co/workspace/My-Workspace~652cd628-b61c-437e-88dc-d4908f8dd2ed/collection/26984432-ef31bf4b-0343-492d-b883-1d9c16bbded9?action=share&creator=26984432&active-environment=26984432-9eec8504-c039-422c-a884-90d4315e0b48