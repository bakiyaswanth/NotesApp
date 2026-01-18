# 📝 Notes App - Angular + .NET 8

A minimalist, black & white note-taking application built with Angular 21 and .NET 8, featuring a Cred/IndMoney-inspired UI design.

## ✨ Features

- 🔐 **User Authentication**: Secure login and registration with password hashing
- 📝 **CRUD Operations**: Create, Read, Update, and Delete notes
- 🎨 **Minimalist UI**: Black & white design inspired by Cred and IndMoney
- 🃏 **Card-based Layout**: Beautiful card interface for notes
- 🐳 **Docker Support**: Full Docker containerization
- 🍃 **MongoDB**: Free cloud database with MongoDB Atlas
- 🚀 **Free Deployment**: Deployable on Render.com, Railway, or Fly.io

## 🛠️ Tech Stack

### Frontend
- **Angular 21** - Modern web framework
- **TypeScript** - Type-safe JavaScript
- **Standalone Components** - Latest Angular architecture
- **Nginx** - Production web server

### Backend
- **.NET 8** - Latest .NET framework
- **MongoDB Driver** - Database connectivity
- **BCrypt** - Password hashing
- **Swagger** - API documentation

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **MongoDB Atlas** - Free cloud database

## 📁 Project Structure

```
NotesApi/
├── Controllers/          # API Controllers
│   └── NotesController.cs
├── Models/               # Data Models
│   ├── Note.cs
│   └── User.cs
├── Services/             # Business Logic
│   └── MongoService.cs
├── Program.cs            # Application Entry
├── Dockerfile            # Backend Docker config
└── notes-web/            # Angular Frontend
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── login/      # Login component
    │   │   │   ├── dashboard/   # Main dashboard
    │   │   │   └── note-card/   # Note card component
    │   │   └── services/
    │   │       └── note.ts      # API service
    │   └── styles.css           # Global styles
    ├── Dockerfile               # Frontend Docker config
    ├── nginx.conf              # Nginx configuration
    └── docker-compose.yml      # Full stack deployment
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ and npm
- .NET 8 SDK
- Docker Desktop (optional, for containerized deployment)
- MongoDB Atlas account (free)

### Local Development

#### 1. Setup MongoDB Atlas
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free M0 cluster
3. Create database user and whitelist IP (0.0.0.0/0 for testing)
4. Get connection string

#### 2. Configure Backend
Update `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "MongoDb": "YOUR_MONGODB_CONNECTION_STRING"
  }
}
```

#### 3. Run Backend
```bash
cd ..
dotnet restore
dotnet run
# Backend runs on http://localhost:5145
```

#### 4. Run Frontend
```bash
cd notes-web
npm install
npm start
# Frontend runs on http://localhost:4200
```

**Note**: Update `src/app/services/note.ts` for local development:
```typescript
private apiUrl = 'http://localhost:5145/api/app';
```

### Docker Deployment

#### 1. Create Environment File
Create `.env` in root directory:
```env
MONGO_CONNECTION_STRING=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

#### 2. Build and Run
```bash
cd notes-web
docker-compose up --build
```

Access:
- Frontend: http://localhost
- Backend API: http://localhost:8080
- Swagger: http://localhost:8080/swagger

## 📚 API Endpoints

### Authentication
- `POST /api/app/register` - Register new user
- `POST /api/app/login` - Login user

### Notes
- `GET /api/app/notes/{userId}` - Get all notes for user
- `POST /api/app/notes` - Create new note
- `PUT /api/app/notes/{id}` - Update note
- `DELETE /api/app/notes/{id}` - Delete note

## 🎨 UI Design Philosophy

The app follows a **neo-brutalist** design approach:
- **Pure black & white** color scheme
- **Sharp corners** (no border-radius)
- **Bold typography** with uppercase text
- **Minimal animations** with smooth transitions
- **Card-based layout** for content organization
- **Hover effects** for interactivity

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy Options:

1. **Render.com** (Recommended - FREE)
   - Backend: Web Service (Docker)
   - Frontend: Static Site
   - Custom domain support

2. **Railway.app**
   - Full-stack deployment
   - $5 free credit/month

3. **Fly.io**
   - Container hosting
   - Free tier available

## 🔒 Security Features

- Password hashing with BCrypt
- CORS configuration
- Input validation
- Secure MongoDB connection
- Environment variable management

## 📝 Usage

1. **Register**: Create a new account
2. **Login**: Authenticate with credentials
3. **Create Notes**: Add title and content
4. **Edit Notes**: Click edit icon on any card
5. **Delete Notes**: Click delete icon
6. **Logout**: Click logout button

## 🐛 Troubleshooting

### Common Issues

**Backend won't start**
- Check MongoDB connection string
- Verify IP whitelist in MongoDB Atlas
- Check port availability (5145)

**Frontend can't connect to API**
- Verify API URL in `note.ts`
- Check CORS settings in backend
- Ensure backend is running

**Docker build fails**
- Check Dockerfile paths
- Verify all files are present
- Check Docker Desktop is running

## 📄 License

This project is open source and available for personal use.

## 🤝 Contributing

Feel free to fork and submit pull requests!

## 📞 Support

For deployment help, see [DEPLOYMENT.md](./DEPLOYMENT.md)

---

**Built with ❤️ using Angular & .NET 8**
