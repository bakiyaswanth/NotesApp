# 📡 API Endpoints Reference

## Base URL
- **Local**: `http://localhost:5145`
- **Production**: `http://mynotesapp.runasp.net`

## API Routes

All API endpoints are under `/api/app/`

### Authentication

#### Register User
```
POST /api/app/register
Content-Type: application/json

Body:
{
  "username": "testuser",
  "password": "password123"
}
```

#### Login
```
POST /api/app/login
Content-Type: application/json

Body:
{
  "username": "testuser",
  "password": "password123"
}

Response:
{
  "userId": "507f1f77bcf86cd799439011"
}
```

### Notes

#### Get All Notes for User
```
GET /api/app/notes/{userId}

Example: GET /api/app/notes/507f1f77bcf86cd799439011
```

#### Create Note
```
POST /api/app/notes
Content-Type: application/json

Body:
{
  "title": "My Note",
  "content": "Note content here",
  "userId": "507f1f77bcf86cd799439011"
}
```

#### Update Note
```
PUT /api/app/notes/{noteId}
Content-Type: application/json

Body:
{
  "title": "Updated Title",
  "content": "Updated content",
  "userId": "507f1f77bcf86cd799439011"
}
```

#### Delete Note
```
DELETE /api/app/notes/{noteId}
```

## Testing Endpoints

### Using Browser
- Health check: `http://mynotesapp.runasp.net/`
- Swagger UI: `http://mynotesapp.runasp.net/swagger` (if enabled)

### Using curl
```bash
# Health check
curl http://mynotesapp.runasp.net/

# Register
curl -X POST http://mynotesapp.runasp.net/api/app/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}'

# Login
curl -X POST http://mynotesapp.runasp.net/api/app/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}'
```

## Troubleshooting 404 Errors

### Issue: Getting 404 on root URL
**Solution**: The root URL (`/`) now returns a health check. API endpoints are at `/api/app/...`

### Issue: API endpoints return 404
**Check**:
1. Backend is running and deployed correctly
2. Routes are correct: `/api/app/...` (not `/api/...`)
3. Controller name is `AppController` (not `NotesController`)
4. Check hosting provider logs for routing errors

### Issue: CORS errors
**Solution**: CORS is configured to allow all origins. Check `Program.cs` for CORS configuration.

## Frontend Configuration

The Angular frontend is configured to use:
- Local: `http://localhost:5145/api/app`
- Production: `http://mynotesapp.runasp.net/api/app`

Check `src/app/services/note.ts` for API URL configuration.
