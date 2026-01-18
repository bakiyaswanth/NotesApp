# 🚀 Complete Setup Guide - Step by Step

This guide will walk you through setting up the Notes App from scratch.

## 📋 Prerequisites Checklist

- [ ] Node.js 20+ installed (`node --version`)
- [ ] .NET 8 SDK installed (`dotnet --version`)
- [ ] Visual Studio 2022 (or VS Code)
- [ ] Docker Desktop (optional, for containerized deployment)
- [ ] Git installed
- [ ] MongoDB Atlas account (free)

---

## Step 1: MongoDB Atlas Setup (5 minutes)

### 1.1 Create Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with email (FREE account)
3. Verify your email

### 1.2 Create Free Cluster
1. Click "Build a Database"
2. Select **FREE** (M0 Sandbox) tier
3. Choose a cloud provider (AWS recommended)
4. Select a region closest to you
5. Click "Create Cluster" (takes 3-5 minutes)

### 1.3 Configure Database Access
1. Go to **Database Access** → **Add New Database User**
2. Authentication Method: **Password**
3. Username: `notesapp_user` (or your choice)
4. Password: Click "Autogenerate Secure Password" (SAVE THIS!)
5. Database User Privileges: **Read and write to any database**
6. Click "Add User"

### 1.4 Configure Network Access
1. Go to **Network Access** → **Add IP Address**
2. For development: Click **"Allow Access from Anywhere"** (0.0.0.0/0)
3. Click "Confirm"

### 1.5 Get Connection String
1. Go to **Database** → Click **"Connect"**
2. Choose **"Connect your application"**
3. Driver: **C# / .NET**
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Example format:
   ```
   mongodb+srv://notesapp_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

---

## Step 2: Backend Setup (.NET 8)

### 2.1 Open Project in Visual Studio 2022
1. Open Visual Studio 2022
2. File → Open → Project/Solution
3. Navigate to `NotesApi` folder
4. Open `NotesApi.slnx` or `NotesApi.csproj`

### 2.2 Configure MongoDB Connection
1. Open `appsettings.json`
2. Replace the connection string:
   ```json
   {
     "ConnectionStrings": {
       "MongoDb": "YOUR_MONGODB_CONNECTION_STRING_HERE"
     }
   }
   ```

### 2.3 Restore Packages
```bash
cd NotesApi
dotnet restore
```

### 2.4 Run Backend
1. In Visual Studio: Press **F5** or click "Run"
2. Or via command line:
   ```bash
   dotnet run
   ```
3. Backend should start on `http://localhost:5145`
4. Test Swagger: `http://localhost:5145/swagger`

---

## Step 3: Frontend Setup (Angular)

### 3.1 Install Dependencies
```bash
cd notes-web
npm install
```

### 3.2 Configure API URL (for local development)
1. Open `src/app/services/note.ts`
2. Update the API URL:
   ```typescript
   private apiUrl = 'http://localhost:5145/api/app';
   ```

### 3.3 Run Frontend
```bash
npm start
```
Frontend runs on `http://localhost:4200`

---

## Step 4: Test the Application

### 4.1 Register a User
1. Open `http://localhost:4200`
2. Enter username and password
3. Click "CREATE ACCOUNT"
4. You should see "Account created" message

### 4.2 Login
1. Enter the same credentials
2. Click "AUTHENTICATE"
3. You should be redirected to dashboard

### 4.3 Create a Note
1. Enter a title and content
2. Click "CREATE NOTE +"
3. Note should appear as a card

### 4.4 Test CRUD Operations
- **Edit**: Click edit icon (✎) on a note card
- **Delete**: Click delete icon (🗑) on a note card
- **View**: Notes are displayed in card grid

---

## Step 5: Docker Setup (Optional)

### 5.1 Create Environment File
Create `.env` file in `notes-web` directory:
```env
MONGO_CONNECTION_STRING=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 5.2 Build and Run
```bash
cd notes-web
docker-compose up --build
```

### 5.3 Access Application
- Frontend: http://localhost
- Backend: http://localhost:8080
- Swagger: http://localhost:8080/swagger

---

## Step 6: Deployment (FREE Options)

### Option A: Render.com (Recommended)

#### Backend Deployment
1. Push code to GitHub
2. Go to https://dashboard.render.com
3. Click "New +" → "Web Service"
4. Connect GitHub repository
5. Settings:
   - **Name**: `notes-api`
   - **Environment**: `Docker`
   - **Dockerfile Path**: `Dockerfile` (in backend root)
   - **Environment Variables**:
     ```
     ConnectionStrings__MongoDb=YOUR_MONGODB_CONNECTION_STRING
     ASPNETCORE_ENVIRONMENT=Production
     ```
6. Click "Create Web Service"
7. Note the URL: `https://notes-api.onrender.com`

#### Frontend Deployment
1. Update `src/app/services/note.ts`:
   ```typescript
   private apiUrl = 'https://notes-api.onrender.com/api/app';
   ```
2. Build Angular app:
   ```bash
   npm run build
   ```
3. In Render Dashboard:
   - Click "New +" → "Static Site"
   - Connect GitHub repository
   - **Build Command**: `cd notes-web && npm install && npm run build`
   - **Publish Directory**: `notes-web/dist/notes-web/browser`
4. Click "Create Static Site"

#### Custom Domain
1. In Render Dashboard → Settings → Custom Domains
2. Add your domain: `notes.yourdomain.com`
3. Update DNS at your domain provider:
   - Type: CNAME
   - Name: `notes`
   - Value: `notes-web.onrender.com`

### Option B: Railway.app
1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Deploy backend:
   ```bash
   cd NotesApi
   railway init
   railway up
   railway add ConnectionStrings__MongoDb=YOUR_CONNECTION_STRING
   railway domain
   ```
4. Deploy frontend:
   ```bash
   cd notes-web
   railway init
   railway up
   railway domain
   ```

---

## 🐛 Troubleshooting

### Backend Issues

**Error: Cannot connect to MongoDB**
- Check connection string format
- Verify password is correct (no special characters need URL encoding)
- Check IP whitelist in MongoDB Atlas
- Ensure cluster is running (not paused)

**Error: Port already in use**
- Change port in `launchSettings.json`
- Or kill process using port 5145

### Frontend Issues

**Error: Cannot connect to API**
- Verify backend is running
- Check API URL in `note.ts`
- Check browser console for CORS errors
- Ensure backend CORS is configured

**Error: Build fails**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version (20+)

### Docker Issues

**Error: Build fails**
- Check Dockerfile paths are correct
- Ensure all files are present
- Check Docker Desktop is running

**Error: Cannot connect to MongoDB from Docker**
- MongoDB Atlas IP whitelist must include Docker host IP
- Or use 0.0.0.0/0 for testing (not recommended for production)

---

## ✅ Verification Checklist

After setup, verify:

- [ ] MongoDB Atlas cluster is running
- [ ] Database user created
- [ ] IP whitelist configured
- [ ] Backend runs locally
- [ ] Frontend runs locally
- [ ] Can register user
- [ ] Can login
- [ ] Can create notes
- [ ] Can edit notes
- [ ] Can delete notes
- [ ] Docker build succeeds (if using Docker)
- [ ] Deployment successful (if deployed)

---

## 📞 Need Help?

1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment details
2. Check [README.md](./README.md) for general info
3. Review error messages in:
   - Browser console (F12)
   - Backend terminal/Visual Studio output
   - Render/Railway logs

---

**You're all set! Happy coding! 🎉**
