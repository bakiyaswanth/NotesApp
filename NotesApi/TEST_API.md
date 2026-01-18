# 🧪 Testing API Endpoints

## Complete curl Commands

### Register User (POST)
```bash
curl -X POST "http://mynotesapp.runasp.net/api/app/register" \
  -H "Content-Type: application/json" \
  -H "Origin: https://ui-notesapp.netlify.app" \
  -d "{\"username\":\"testuser\",\"password\":\"test123\"}"
```

### Login (POST)
```bash
curl -X POST "http://mynotesapp.runasp.net/api/app/login" \
  -H "Content-Type: application/json" \
  -H "Origin: https://ui-notesapp.netlify.app" \
  -d "{\"username\":\"testuser\",\"password\":\"test123\"}"
```

### Test Endpoint (GET)
```bash
curl "http://mynotesapp.runasp.net/api/app/test"
```

### Get Notes (GET)
```bash
curl "http://mynotesapp.runasp.net/api/app/notes/USER_ID_HERE"
```

## Windows PowerShell Commands

### Register User
```powershell
curl.exe -X POST "http://mynotesapp.runasp.net/api/app/register" `
  -H "Content-Type: application/json" `
  -H "Origin: https://ui-notesapp.netlify.app" `
  -d '{\"username\":\"testuser\",\"password\":\"test123\"}'
```

### Login
```powershell
curl.exe -X POST "http://mynotesapp.runasp.net/api/app/login" `
  -H "Content-Type: application/json" `
  -H "Origin: https://ui-notesapp.netlify.app" `
  -d '{\"username\":\"testuser\",\"password\":\"test123\"}'
```

## Using Postman

1. **Method**: POST
2. **URL**: `http://mynotesapp.runasp.net/api/app/register`
3. **Headers**:
   - `Content-Type: application/json`
   - `Origin: https://ui-notesapp.netlify.app`
4. **Body** (raw JSON):
   ```json
   {
     "username": "testuser",
     "password": "test123"
   }
   ```

## Expected Responses

### Register Success
```json
"User created"
```

### Login Success
```json
{
  "userId": "507f1f77bcf86cd799439011"
}
```

### Test Endpoint
```json
{
  "message": "API is working!",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## Troubleshooting

### CORS Errors
- CORS is configured to allow all origins
- Check `Program.cs` for CORS configuration
- Ensure `Origin` header matches your frontend URL

### 405 Method Not Allowed
- Ensure you're using POST for register/login
- Check HTTP method in your request

### 400 Bad Request
- Check JSON format is correct
- Ensure `Content-Type: application/json` header is set
- Verify username and password fields are present
