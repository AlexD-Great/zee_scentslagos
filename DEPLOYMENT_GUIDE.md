# Vercel Deployment Guide

## 🚀 Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier is fine)
- Git installed on your computer

---

## Step-by-Step Deployment

### 1. Push to GitHub

```bash
# Initialize git (if not already done)
cd c:\Users\shelby\Desktop\zee_scentslagos
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Zee Scents Lagos website"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/zee_scentslagos.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

**Option A: Using Vercel CLI (Recommended)**

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? zee-scents-lagos
# - Directory? ./
# - Override settings? No

# For production deployment
vercel --prod
```

**Option B: Using Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click "Deploy"

### 3. Your Live URL

After deployment, you'll get a URL like:
- **Production**: `https://zee-scents-lagos.vercel.app`
- **Preview**: `https://zee-scents-lagos-git-main-username.vercel.app`

---

## 🔧 Configuration

The `vercel.json` file is already configured for you:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures:
- ✅ Proper routing for React Router
- ✅ All paths redirect to index.html
- ✅ Vite build optimization

---

## 🌐 Custom Domain (Optional)

### Add Your Own Domain

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `zeescents.com`)
3. Update your DNS records as instructed by Vercel
4. SSL certificate is automatically provisioned

---

## 🔄 Automatic Deployments

Once connected to GitHub:
- ✅ Every push to `main` branch = Production deployment
- ✅ Every pull request = Preview deployment
- ✅ Automatic builds on code changes

---

## 📊 Vercel Features You Get (FREE)

- ✅ **Unlimited bandwidth**
- ✅ **Automatic HTTPS/SSL**
- ✅ **Global CDN** (fast worldwide)
- ✅ **Automatic deployments**
- ✅ **Preview URLs** for testing
- ✅ **Analytics** (basic)
- ✅ **99.99% uptime SLA**

---

## 🔐 Environment Variables (For Full E-Commerce)

When you add payment processing, set these in Vercel Dashboard:

1. Go to Settings → Environment Variables
2. Add:
   - `VITE_PAYSTACK_PUBLIC_KEY`
   - `VITE_FLUTTERWAVE_PUBLIC_KEY`
   - `VITE_STRIPE_PUBLIC_KEY`
   - `VITE_API_URL`

---

## 💡 Tips

### Update the Live Site
```bash
# Make changes locally
git add .
git commit -m "Update: description of changes"
git push

# Vercel automatically deploys!
```

### Rollback to Previous Version
1. Go to Vercel Dashboard → Deployments
2. Find the working version
3. Click "Promote to Production"

### Check Build Logs
- Vercel Dashboard → Deployments → Click on deployment → View Logs

---

## 🎯 What to Share with Client

**Demo URL**: `https://zee-scents-lagos.vercel.app`

**Features Live**:
- ✅ Homepage with hero section
- ✅ Product gallery with search/filters
- ✅ AI Fragrance Finder
- ✅ Admin Dashboard
- ✅ Crypto Payment Page
- ✅ About & Contact pages
- ✅ Fully responsive
- ✅ Fast loading (Vercel CDN)
- ✅ Secure (HTTPS)

---

## 🚨 Troubleshooting

### Build Fails
```bash
# Test build locally first
npm run build

# If it works locally but fails on Vercel:
# Check Node version in vercel.json
```

### 404 Errors on Routes
- Ensure `vercel.json` has the rewrites configuration
- Check that all routes are defined in `App.jsx`

### Slow Loading
- Images should be optimized (use WebP format)
- Consider lazy loading for images
- Vercel automatically handles caching

---

## 📱 Mobile Testing

Test your deployed site on:
- **Chrome DevTools**: Device emulation
- **Real devices**: Share the Vercel URL
- **BrowserStack**: Cross-browser testing

---

## ✅ Deployment Checklist

Before showing to client:

- [ ] All pages load correctly
- [ ] Navigation works on all pages
- [ ] Forms submit (even if demo)
- [ ] Mobile responsive
- [ ] Images load properly
- [ ] No console errors
- [ ] Fast loading speed
- [ ] HTTPS enabled
- [ ] Custom domain (if applicable)

---

**Your site is now live and accessible worldwide! 🎉**
