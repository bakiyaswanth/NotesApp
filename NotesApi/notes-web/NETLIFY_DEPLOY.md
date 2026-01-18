# 🚀 Netlify Deployment Guide

## ✅ Fixed Configuration

I've created a `netlify.toml` file in your repository root that tells Netlify:
- **Base directory**: `notes-web` (where your Angular app is)
- **Build command**: `npm install && npm run build`
- **Publish directory**: `dist/notes-web/browser` (Angular output)
- **SPA routing**: Redirects all routes to `index.html`

## 📋 Steps to Deploy

### 1. Commit and Push Changes
```bash
git add .
git commit -m "Add Netlify configuration"
git push origin main
```

### 2. Connect to Netlify

**Option A: Via Netlify Dashboard**
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Select your `NotesApp` repository
5. Netlify will auto-detect the `netlify.toml` configuration
6. Click "Deploy site"

**Option B: Via Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
netlify init
# Follow prompts - it will detect netlify.toml automatically
netlify deploy --prod
```

### 3. Configure Environment Variables (Optional)

If you need to set the API URL:
1. Go to Netlify Dashboard → Site settings → Environment variables
2. Add: `NG_APP_API_URL` = `http://mynotesapp.runasp.net/api/app`

### 4. Set Up Custom Domain

1. Go to Netlify Dashboard → Domain settings
2. Click "Add custom domain"
3. Enter your domain: `notes.yourdomain.com`
4. Follow DNS instructions:
   - Add CNAME record: `notes` → `your-site.netlify.app`
   - Or A record: `@` → Netlify IP (shown in dashboard)

## 🔧 Configuration Details

The `netlify.toml` file is located in your repository root and contains:

```toml
[build]
  base = "notes-web"              # Angular app subdirectory
  command = "npm install && npm run build"
  publish = "dist/notes-web/browser"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## ✅ Verification Checklist

After deployment:
- [ ] Build completes successfully
- [ ] Site is accessible at `your-site.netlify.app`
- [ ] Login page loads correctly
- [ ] API calls work (check browser console)
- [ ] Angular routing works (try refreshing on `/dashboard`)
- [ ] Custom domain configured (if applicable)

## 🐛 Troubleshooting

### Build Fails: "Base directory does not exist"
- ✅ **Fixed**: `netlify.toml` is now in repository root
- Make sure `notes-web` folder exists in your repo
- Verify the `base` path in `netlify.toml` matches your folder structure

### Build Fails: "Cannot find module"
- Netlify needs to install dependencies first
- The `command` in `netlify.toml` includes `npm install`
- Check that `package.json` is in `notes-web` directory

### 404 on Refresh
- ✅ **Fixed**: `[[redirects]]` section handles SPA routing
- All routes redirect to `index.html`

### API Calls Fail
- Check API URL in `src/app/services/note.ts`
- For production, it should point to your backend: `http://mynotesapp.runasp.net/api/app`
- The code auto-detects localhost vs production

### Build Takes Too Long
- Netlify caches `node_modules` between builds
- First build is slower, subsequent builds are faster

## 📝 Important Notes

1. **Repository Structure**: Your repo should have:
   ```
   NotesApp/
   ├── netlify.toml          ← Configuration file (root)
   ├── notes-web/            ← Angular app
   │   ├── package.json
   │   ├── src/
   │   └── ...
   └── NotesApi/             ← .NET backend (not needed for Netlify)
   ```

2. **Backend**: Your backend is deployed separately at `mynotesapp.runasp.net`
   - Frontend (Netlify) → Backend (MonsterASP.NET)
   - Make sure CORS is configured in backend

3. **Free Tier**: Netlify free tier includes:
   - 100GB bandwidth/month
   - 300 build minutes/month
   - Custom domains
   - SSL certificates (automatic)

## 🎉 You're All Set!

After pushing the `netlify.toml` file, Netlify should automatically:
1. Detect the configuration
2. Build your Angular app
3. Deploy it to a `.netlify.app` URL
4. Enable automatic deployments on every push

---

**Need help?** Check Netlify build logs in the dashboard for detailed error messages.
