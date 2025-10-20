# Deploy to Vercel - Quick Guide

## Step 1: Push to GitHub

1. **Create repo on GitHub:**
   - Go to https://github.com/new
   - Name: `stoja-trade-demo`
   - Public repo
   - Don't initialize with README (we already have files)
   - Click "Create repository"

2. **Push your code:**
```bash
cd /Users/lukakraljevic/Desktop/work/LsquaredXXX/CURRENT_FUTURE/real-estate-demo

git remote add origin https://github.com/YOUR_USERNAME/stoja-trade-demo.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy on Vercel

1. Go to **https://vercel.com**
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Click **"Import Git Repository"**
5. Find **stoja-trade-demo**
6. Click **"Import"**
7. Vercel auto-detects settings (React app)
8. Click **"Deploy"**

**Wait 2-3 minutes...**

✅ Done! You'll get URL: `https://stoja-trade-demo.vercel.app`

## Step 3: Add URL to Email

Update both `EMAIL-TO-SARA.md` and `EMAIL-TO-SARA-ENGLISH.md`:

Add after "Next Steps:" section:
```
Demo site: https://stoja-trade-demo.vercel.app
(Try it yourself - the chatbot works live!)
```

---

**Note:** 
- Vercel free tier = unlimited projects ✅
- Every git push auto-deploys updates ✅
- Takes 2-3 min per deployment ✅

