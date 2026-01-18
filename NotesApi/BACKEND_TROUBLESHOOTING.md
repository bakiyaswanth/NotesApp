# 🔧 Backend Troubleshooting Guide

## Error: HTTP Error 500.30 - ASP.NET Core app failed to start

This error means the .NET backend failed to start. Common causes and solutions:

### 1. MongoDB Connection Issue

**Problem**: MongoDB connection string is missing or invalid.

**Solution**:
- Check `appsettings.json` has the correct MongoDB connection string
- Verify MongoDB Atlas cluster is running
- Check IP whitelist in MongoDB Atlas (should include your hosting provider's IP)
- Test connection string format: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

### 2. Port Configuration Issue

**Problem**: Port conflict with hosting provider (IIS/MonsterASP.NET).

**Solution**: 
- The code now only sets port if `PORT` environment variable exists
- For IIS/hosting providers, let them handle port configuration
- Check hosting provider's port settings

### 3. Missing Environment Variables

**Problem**: Required environment variables not set.

**Solution**:
- Set `ConnectionStrings__MongoDb` in hosting provider's environment variables
- Or ensure `appsettings.json` has the connection string

### 4. Missing Dependencies

**Problem**: NuGet packages not restored.

**Solution**:
```bash
dotnet restore
dotnet publish -c Release
```

### 5. Enable Detailed Logging

Add to `appsettings.json`:
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.AspNetCore.Hosting.Diagnostics": "Information"
    }
  }
}
```

## Quick Fixes

### For MonsterASP.NET / IIS Hosting:

1. **Check web.config** (if using IIS):
   ```xml
   <aspNetCore processPath="dotnet" 
               arguments=".\NotesApi.dll" 
               stdoutLogEnabled="true" 
               stdoutLogFile=".\logs\stdout" />
   ```

2. **Set Environment Variables** in hosting panel:
   - `ASPNETCORE_ENVIRONMENT=Production`
   - `ConnectionStrings__MongoDb=your_connection_string`

3. **Check Application Logs**:
   - Look for detailed error messages
   - Check MongoDB connection errors
   - Verify port configuration

### For Render.com / Railway:

1. **Set Environment Variables**:
   - `ConnectionStrings__MongoDb=your_connection_string`
   - `PORT` (auto-set by platform)

2. **Check Build Logs**:
   - Verify build completes successfully
   - Check runtime logs for errors

## Testing Locally

Before deploying, test locally:

```bash
cd NotesApi
dotnet run
```

Should start on `http://localhost:5145`

## Common MongoDB Atlas Issues

1. **IP Whitelist**: Add `0.0.0.0/0` for testing (not recommended for production)
2. **Connection String Format**: Must include `?retryWrites=true&w=majority`
3. **Password Special Characters**: URL encode special characters in password
4. **Database Name**: Connection string doesn't specify database, code uses "NotesDb"

## Next Steps

1. Check hosting provider logs for detailed error
2. Verify MongoDB connection string
3. Test MongoDB connection from hosting provider's IP
4. Check environment variables are set correctly

---

**Need more help?** Share the detailed error logs from your hosting provider!
