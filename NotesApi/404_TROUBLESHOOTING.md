# 🔍 404 Error Troubleshooting Guide

## Problem: Getting 404 on `http://mynotesapp.runasp.net/`

### Quick Checks

1. **Test Health Check Endpoint**
   - After deploying the updated code, try: `http://mynotesapp.runasp.net/`
   - Should return: `{"status":"online","message":"Notes API is running",...}`

2. **Test API Endpoint**
   - Try: `http://mynotesapp.runasp.net/api/app/register`
   - Should return an error about missing body (not 404)

3. **Test Swagger**
   - Try: `http://mynotesapp.runasp.net/swagger`
   - Should show API documentation

## Common Causes

### 1. Backend Not Deployed Correctly

**Check**:
- Is the backend application deployed?
- Are all files uploaded (including `NotesApi.dll`)?
- Is `web.config` present in the root?

**Solution**:
- Ensure you publish the application: `dotnet publish -c Release`
- Upload all files from `bin/Release/net8.0/publish/` folder
- Make sure `web.config` is in the root directory

### 2. IIS Configuration Issue

**Check**:
- Is ASP.NET Core Hosting Bundle installed on server?
- Is the application pool configured correctly?
- Check IIS logs: `C:\inetpub\logs\LogFiles\`

**Solution**:
- Install ASP.NET Core 8.0 Hosting Bundle on server
- Set application pool to "No Managed Code"
- Check `web.config` is correct

### 3. Application Not Starting

**Check**:
- Look at application logs (stdout logs)
- Check Windows Event Viewer
- Verify MongoDB connection string

**Solution**:
- Check `logs/stdout` folder for errors
- Verify `appsettings.json` has MongoDB connection string
- Or set `ConnectionStrings__MongoDb` as environment variable

### 4. Route Configuration

**API Routes**:
- Root: `/` (health check)
- Register: `/api/app/register`
- Login: `/api/app/login`
- Notes: `/api/app/notes/{userId}`

**Frontend Configuration**:
- Check `src/app/services/note.ts` has correct API URL
- Should be: `http://mynotesapp.runasp.net/api/app`

## Testing Steps

### Step 1: Test Root Endpoint
```bash
curl http://mynotesapp.runasp.net/
```
Expected: JSON with status and endpoints list

### Step 2: Test API Endpoint
```bash
curl -X POST http://mynotesapp.runasp.net/api/app/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}'
```
Expected: Success message or validation error (not 404)

### Step 3: Check Swagger
Open in browser: `http://mynotesapp.runasp.net/swagger`
Expected: Swagger UI with API documentation

## Deployment Checklist

- [ ] Published application: `dotnet publish -c Release`
- [ ] Uploaded all files from `publish` folder
- [ ] `web.config` is in root directory
- [ ] `appsettings.json` has MongoDB connection string
- [ ] Application pool is configured correctly
- [ ] ASP.NET Core Hosting Bundle is installed
- [ ] Checked application logs for errors

## Next Steps

1. **Deploy Updated Code**:
   - The new code includes a health check endpoint at `/`
   - Swagger is now enabled in production
   - Better error handling

2. **Test Endpoints**:
   - Root: `http://mynotesapp.runasp.net/`
   - Swagger: `http://mynotesapp.runasp.net/swagger`
   - API: `http://mynotesapp.runasp.net/api/app/register`

3. **Check Logs**:
   - Application logs: `logs/stdout`
   - IIS logs: `C:\inetpub\logs\LogFiles\`
   - Windows Event Viewer

## If Still Getting 404

1. Verify the backend is actually running
2. Check hosting provider's control panel for application status
3. Contact hosting provider support with:
   - Application logs
   - Error messages
   - Deployment method used

---

**The health check endpoint at `/` will help confirm the backend is running!**
