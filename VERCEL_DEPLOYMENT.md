# Vercel Deployment Guide

## ✅ Code Changes Complete

The codebase has been updated to use **Vercel Blob Storage** instead of local filesystem for file uploads.

## 🚀 Steps to Deploy

### 1. Install Dependencies

Navigate to the backend folder and install the new package:

```bash
cd backend
npm install
```

This will install `@vercel/blob` package.

---

### 2. Get Vercel Blob Token

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: **clinix-sphere**
3. Go to **Storage** tab
4. Click **Create Database** → Select **Blob**
5. Create a new Blob store (any name, e.g., "clinix-uploads")
6. Copy the **BLOB_READ_WRITE_TOKEN** from the Blob store settings

---

### 3. Add Environment Variable to Vercel

**In Vercel Dashboard:**

1. Go to your project **Settings** → **Environment Variables**
2. Add a new variable:
   - **Key:** `BLOB_READ_WRITE_TOKEN`
   - **Value:** (paste the token you copied)
   - **Environments:** Select all (Production, Preview, Development)
3. Click **Save**

---

### 4. Update Local .env File

Add this line to your `backend/.env` file:

```env
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here
```

Replace `your_vercel_blob_token_here` with the actual token.

---

### 5. Redeploy to Vercel

**Option A - Automatic (Recommended):**
Push your code changes to GitHub:
```bash
git add .
git commit -m "Migrate to Vercel Blob Storage"
git push
```
Vercel will automatically redeploy.

**Option B - Manual:**
In Vercel Dashboard, go to Deployments → Click "Redeploy"

---

### 6. Update Frontend API URLs (if needed)

Make sure your frontend apps are pointing to the correct Vercel backend URL:

**Doctor Dashboard:** `doctor-dashboard/.env`
```env
VITE_API_URL=https://clinix-sphere-amber.vercel.app/api
```

**Patient App:** `patient-app/.env`
```env
EXPO_PUBLIC_API_URL=https://clinix-sphere-amber.vercel.app/api
```

---

## 🎯 What Changed

### Files Modified:
1. ✅ `backend/config/upload.js` - Switched from disk storage to memory storage
2. ✅ `backend/controllers/user.controller.js` - Upload/delete photos to Vercel Blob
3. ✅ `backend/package.json` - Added `@vercel/blob` dependency
4. ✅ `backend/.env.example` - Added `BLOB_READ_WRITE_TOKEN`

### How It Works Now:
- Profile photos are uploaded to **Vercel Blob Storage** (cloud storage)
- Photos are stored as public URLs (e.g., `https://xyz.public.blob.vercel-storage.com/...`)
- No local filesystem required ✅ Serverless-compatible!

---

## 🧪 Testing After Deployment

1. Visit: `https://clinix-sphere-amber.vercel.app`
2. You should see your app running without errors
3. Test profile photo upload functionality

---

## 📊 Vercel Blob Free Tier

- **Storage:** 1 GB
- **Bandwidth:** 100 GB/month
- Perfect for your healthcare app!

---

## ❌ Troubleshooting

If you still see errors:

1. **Check if token is set:**
   - Vercel Dashboard → Settings → Environment Variables
   - Confirm `BLOB_READ_WRITE_TOKEN` exists

2. **Check logs:**
   - Vercel Dashboard → Deployments → Click latest → Runtime Logs

3. **Redeploy:**
   - Settings → Re-deploy latest deployment

---

## 📝 Notes

- The old `uploads/profiles` directory is no longer needed
- All photos are now stored in Vercel's cloud
- Old local photos won't be migrated automatically (if you need them, they must be re-uploaded)
