# ⚡ Quick Start Guide

Get your Notes App running in 5 minutes!

## 🚀 Fastest Way to Run Locally

### 1. MongoDB Setup (2 min)
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create FREE cluster
3. Create database user (save password!)
4. Whitelist IP: `0.0.0.0/0`
5. Copy connection string

### 2. Backend (1 min)
```bash
cd NotesApi
# Update appsettings.json with MongoDB connection string
dotnet run
```

### 3. Frontend (1 min)
```bash
cd notes-web
# Update src/app/services/note.ts: apiUrl = 'http://localhost:5145/api/app'
npm install
npm start
```

### 4. Test (1 min)
1. Open http://localhost:4200
2. Register → Login → Create Note
3. Done! ✅

---

## 🐳 Docker Way (Even Faster!)

```bash
cd notes-web
# Create .env file with MONGO_CONNECTION_STRING
docker-compose up --build
```

Access: http://localhost

---

## 🌐 Deploy for FREE

### Render.com (Recommended)
1. Push to GitHub
2. Deploy backend as Web Service (Docker)
3. Deploy frontend as Static Site
4. Add custom domain
5. **100% FREE!**

See [DEPLOYMENT.md](./DEPLOYMENT.md) for details.

---

## 📚 Full Documentation

- **Setup Guide**: [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Deployment**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **README**: [README.md](./README.md)

---

**That's it! You're ready to go! 🎉**
