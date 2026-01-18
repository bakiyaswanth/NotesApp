# 🚀 Notes App - Deployment Guide

A complete guide to deploy your Angular + .NET 8 Notes App for **FREE**!

## 📋 Table of Contents
1. [Free Hosting Options](#free-hosting-options)
2. [MongoDB Setup (Free)](#mongodb-setup-free)
3. [Deployment Options](#deployment-options)
4. [Docker Deployment](#docker-deployment)
5. [Domain Configuration](#domain-configuration)

---

## 🆓 Free Hosting Options

### Option 1: Render.com (Recommended - 100% Free)
- **Frontend**: Static site hosting (FREE forever)
- **Backend**: Web service (FREE tier: 750 hours/month)
- **Domain**: Connect your custom domain (FREE)
- **Limitations**: Free tier sleeps after 15 min inactivity (wakes on request)

### Option 2: Railway.app
- **Both**: Full-stack deployment (FREE tier: $5 credit/month)
- **Domain**: Custom domain support (FREE)
- **Limitations**: Limited free credits

### Option 3: Fly.io
- **Both**: Container hosting (FREE tier available)
- **Domain**: Custom domain support (FREE)
- **Limitations**: Limited resources

### Option 4: Vercel (Frontend) + Render (Backend)
- **Frontend**: Vercel (FREE forever, excellent CDN)
- **Backend**: Render (FREE tier)
- **Domain**: Both support custom domains

---

## 🍃 MongoDB Setup (Free)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for FREE account
3. Create a FREE cluster (M0 Sandbox - 512MB storage)

### Step 2: Configure Database
1. **Create Database User**:
   - Go to "Database Access" → "Add New Database User"
   - Username: `notesapp_user`
   - Password: Generate secure password (save it!)
   - Database User Privileges: "Read and write to any database"

2. **Whitelist IP Address**:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for testing
   - For production, add your hosting provider's IP ranges

3. **Get Connection String**:
   - Go to "Database" → "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://notesapp_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

### Step 3: Update Backend Configuration
Update `appsettings.json` in your backend:
```json
{
  "ConnectionStrings": {
    "MongoDb": "YOUR_MONGODB_CONNECTION_STRING_HERE"
  }
}
```

---

## 🐳 Docker Deployment

### Prerequisites
- Docker Desktop installed
- MongoDB Atlas connection string

### Step 1: Update Environment Variables
Create `.env` file in the root directory:
```env
MONGO_CONNECTION_STRING=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Step 2: Build and Run with Docker Compose
```bash
# From the notes-web directory
docker-compose up --build
```

This will:
- Build Angular frontend (port 80)
- Build .NET backend (port 8080)
- Connect both services

### Step 3: Access Application
- Frontend: http://localhost
- Backend API: http://localhost:8080
- Swagger: http://localhost:8080/swagger

---

## 🌐 Deployment to Render.com (FREE)

### Part 1: Deploy Backend (.NET 8)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Create Render Web Service**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Settings:
     - **Name**: `notes-api`
     - **Environment**: `Docker`
     - **Dockerfile Path**: `Dockerfile` (in backend root)
     - **Build Command**: (leave empty, Docker handles it)
     - **Start Command**: (leave empty)
     - **Environment Variables**:
       ```
       ASPNETCORE_ENVIRONMENT=Production
       ConnectionStrings__MongoDb=YOUR_MONGODB_CONNECTION_STRING
       ```
   - Click "Create Web Service"
   - Note the URL: `https://notes-api.onrender.com`

3. **Update Frontend API URL**:
   - In `src/app/services/note.ts`, change:
     ```typescript
     private apiUrl = 'https://notes-api.onrender.com/api/app';
     ```

### Part 2: Deploy Frontend (Angular)

1. **Build Angular App**:
   ```bash
   npm run build
   ```

2. **Create Render Static Site**:
   - Go to Render Dashboard
   - Click "New +" → "Static Site"
   - Connect GitHub repository
   - Settings:
     - **Name**: `notes-web`
     - **Build Command**: `cd notes-web && npm install && npm run build`
     - **Publish Directory**: `notes-web/dist/notes-web/browser`
   - Click "Create Static Site"

3. **Add Environment Variable** (if needed):
   - In Render dashboard → Environment
   - Add: `NG_APP_API_URL=https://notes-api.onrender.com/api/app`

### Part 3: Connect Custom Domain

1. **In Render Dashboard**:
   - Go to your service → Settings → Custom Domains
   - Add your domain: `notes.yourdomain.com`
   - Follow DNS instructions

2. **Update DNS Records** (at your domain provider):
   - Add CNAME record:
     - Name: `notes` (or `@` for root domain)
     - Value: `notes-web.onrender.com`

3. **For Backend** (if using subdomain):
   - Add CNAME: `api.notes.yourdomain.com` → `notes-api.onrender.com`

---

## 🚀 Alternative: Railway.app Deployment

### Step 1: Install Railway CLI
```bash
npm i -g @railway/cli
railway login
```

### Step 2: Deploy Backend
```bash
cd ..
railway init
railway up
railway add MONGO_CONNECTION_STRING=your_connection_string
railway domain
```

### Step 3: Deploy Frontend
```bash
cd notes-web
railway init
railway up
railway domain
```

---

## 🔧 Local Development Setup

### Backend
```bash
cd ..
dotnet restore
dotnet run
# Runs on http://localhost:5145
```

### Frontend
```bash
cd notes-web
npm install
npm start
# Runs on http://localhost:4200
```

**Important**: Update `src/app/services/note.ts`:
```typescript
private apiUrl = 'http://localhost:5145/api/app';
```

---

## 📝 Environment Variables Reference

### Backend (.NET)
- `ConnectionStrings__MongoDb`: MongoDB connection string
- `ASPNETCORE_ENVIRONMENT`: `Production` or `Development`
- `PORT`: Server port (default: 8080)

### Frontend (Angular)
- `NG_APP_API_URL`: Backend API URL (optional, uses relative path by default)

---

## ✅ Post-Deployment Checklist

- [ ] MongoDB Atlas cluster is running
- [ ] Database user created with correct permissions
- [ ] IP whitelist configured (0.0.0.0/0 for testing)
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] API calls working (check browser console)
- [ ] Custom domain configured (if applicable)
- [ ] SSL/HTTPS enabled (automatic on Render)

---

## 🐛 Troubleshooting

### Backend Issues
- **Connection refused**: Check MongoDB IP whitelist
- **500 errors**: Check MongoDB connection string format
- **CORS errors**: Already configured in `Program.cs`

### Frontend Issues
- **API calls failing**: Check API URL in `note.ts`
- **404 on refresh**: Angular routing - nginx config handles this
- **Build errors**: Check Node.js version (20+)

### Docker Issues
- **Port conflicts**: Change ports in `docker-compose.yml`
- **Build fails**: Check Dockerfile paths
- **Network errors**: Ensure services are on same network

---

## 💡 Tips for Free Tier

1. **Render.com**: 
   - Free tier sleeps after 15 min
   - First request after sleep takes ~30 seconds
   - Consider upgrading to paid ($7/month) for always-on

2. **MongoDB Atlas**:
   - Free tier: 512MB storage
   - Perfect for small apps
   - Upgrade when you hit limits

3. **Domain**:
   - Use your friend's domain subdomain
   - Example: `notes.yourdomain.com`
   - FREE with any hosting provider

---

## 📞 Support

If you encounter issues:
1. Check Render/Railway logs
2. Check MongoDB Atlas logs
3. Verify environment variables
4. Test API endpoints with Swagger/Postman

---

**Happy Deploying! 🎉**
