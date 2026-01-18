# 🔒 CORS Blocked Request - Fix Guide

## Problem: "Status showing blocked" in Browser Inspect

This usually means:
1. **CORS error** - Browser blocking cross-origin requests
2. **Mixed content** - HTTPS frontend calling HTTP backend
3. **Preflight OPTIONS** request failing

## Solutions Applied

### 1. Enhanced CORS Configuration
- Added explicit OPTIONS request handling
- CORS middleware placed before controllers
- Allows all origins, methods, and headers

### 2. Mixed Content Issue (HTTPS → HTTP)

**Problem**: Netlify frontend (HTTPS) calling HTTP backend

**Solutions**:

#### Option A: Use HTTPS Backend (Recommended)
- Configure SSL certificate for `mynotesapp.runasp.net`
- Update frontend to use `https://mynotesapp.runasp.net`

#### Option B: Use Proxy (Netlify)
Add `netlify.toml` proxy configuration:

```toml
[[redirects]]
  from = "/api/*"
  to = "http://mynotesapp.runasp.net/api/:splat"
  status = 200
  force = true
```

Then update frontend to use relative paths:
```typescript
private apiUrl = '/api/app';
```

#### Option C: Disable Mixed Content (Not Recommended)
- Only works for testing
- Browsers block HTTP from HTTPS by default

## Check Browser Console

Look for these errors:

### CORS Error:
```
Access to XMLHttpRequest at 'http://mynotesapp.runasp.net/api/app/register' 
from origin 'https://ui-notesapp.netlify.app' has been blocked by CORS policy
```

### Mixed Content Error:
```
Mixed Content: The page at 'https://...' was loaded over HTTPS, but requested 
an insecure resource 'http://...'. This request has been blocked.
```

## Quick Test

1. **Open Browser Console** (F12)
2. **Check Network Tab**:
   - Look for failed requests (red)
   - Check status code
   - Check error message

3. **Test API directly**:
   ```bash
   curl -X POST "http://mynotesapp.runasp.net/api/app/register" \
     -H "Content-Type: application/json" \
     -H "Origin: https://ui-notesapp.netlify.app" \
     -d '{"username":"test","password":"test123"}'
   ```

## Recommended Solution: Netlify Proxy

Since your frontend is on Netlify (HTTPS) and backend is HTTP, use Netlify's proxy feature:

1. **Update `netlify.toml`** in `notes-web` folder:
```toml
[[redirects]]
  from = "/api/*"
  to = "http://mynotesapp.runasp.net/api/:splat"
  status = 200
  force = true
```

2. **Update `src/app/services/note.ts`**:
```typescript
private apiUrl = '/api/app';  // Relative path - uses Netlify proxy
```

3. **Redeploy frontend**

This way:
- Frontend calls: `https://ui-notesapp.netlify.app/api/app/register`
- Netlify proxies to: `http://mynotesapp.runasp.net/api/app/register`
- No mixed content issues!

---

**The backend CORS is now fixed. The main issue is likely mixed content (HTTPS → HTTP).**
