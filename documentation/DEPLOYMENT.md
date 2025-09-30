# Deployment Guide

## Overview
This guide covers deployment options for the BarangkuApps fullstack application, including free hosting solutions perfect for portfolio projects.

## 🚀 Recommended: Vercel + Supabase (Free)

### Prerequisites
- GitHub account
- Vercel account (linked to GitHub)
- Supabase account

### Step 1: Supabase Database Setup

1. **Create Supabase Project**
   ```bash
   # Visit https://supabase.com/dashboard
   # Create new project
   # Note down: Project URL, API Key (anon), API Key (service_role)
   ```

2. **Setup Database Schema**
   ```sql
   -- Run in Supabase SQL Editor
   -- Copy contents from backend/config/supabase_schema.sql
   ```

3. **Configure Row Level Security (RLS)**
   ```sql
   -- Enable RLS for users table
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   
   -- Enable RLS for barang table
   ALTER TABLE barang ENABLE ROW LEVEL SECURITY;
   
   -- Add policies (see supabase_schema.sql for complete policies)
   ```

### Step 2: Backend Deployment (Vercel)

1. **Prepare Backend for Vercel**
   ```bash
   # Create vercel.json in backend folder
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/server.js"
       }
     ]
   }
   ```

2. **Deploy Backend**
   ```bash
   # Push to GitHub
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   
   # Import to Vercel
   # 1. Go to vercel.com/dashboard
   # 2. Import Git Repository
   # 3. Select backend folder as root directory
   # 4. Add environment variables
   ```

3. **Environment Variables for Backend**
   ```env
   NODE_ENV=production
   PORT=3001
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   JWT_SECRET=your_jwt_secret_key
   CORS_ORIGIN=your_frontend_url
   ```

### Step 3: Frontend Deployment (Vercel)

1. **Prepare Frontend**
   ```bash
   # Update next.config.js
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     reactStrictMode: true,
     env: {
       NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
     }
   }
   
   module.exports = nextConfig
   ```

2. **Deploy Frontend**
   ```bash
   # Import to Vercel (separate project)
   # 1. Import Git Repository
   # 2. Select frontend folder as root directory
   # 3. Framework: Next.js
   # 4. Add environment variables
   ```

3. **Environment Variables for Frontend**
   ```env
   NEXT_PUBLIC_API_URL=your_backend_vercel_url
   ```

### Step 4: Domain Configuration

1. **Update CORS Settings**
   ```javascript
   // backend/server.js
   const corsOptions = {
     origin: [
       'http://localhost:3000',
       'your-frontend-vercel-url.vercel.app'
     ],
     credentials: true
   };
   ```

2. **Update API URLs**
   ```javascript
   // frontend/utils/api.js
   const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
   ```

## 🐳 Alternative: Docker Deployment

### Prerequisites
- Docker & Docker Compose
- VPS or cloud server

### Backend Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
```

### Frontend Dockerfile
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:3001
    depends_on:
      - backend

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=barangku
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backend/config/schema.sql:/docker-entrypoint-initdb.d/schema.sql

volumes:
  postgres_data:
```

## 🌐 Other Free Hosting Options

### 1. Railway.app
- **Backend**: Railway
- **Frontend**: Vercel/Netlify
- **Database**: Railway PostgreSQL

### 2. Render.com
- **Backend**: Render Web Service
- **Frontend**: Render Static Site
- **Database**: Render PostgreSQL

### 3. Heroku (Limited Free Tier)
- **Backend**: Heroku Dyno
- **Frontend**: Heroku or separate service
- **Database**: Heroku PostgreSQL

## 📊 Cost Comparison

| Service | Free Tier | Limitations | Best For |
|---------|-----------|-------------|----------|
| Vercel + Supabase | ✅ | 100GB bandwidth, 500MB DB | **Recommended** |
| Railway | ✅ | $5 credit/month | Small projects |
| Render | ✅ | 750 hours/month | Portfolio |
| Heroku | ⚠️ | No free tier | Not recommended |

## 🔧 Production Optimization

### 1. Environment Configuration
```bash
# Production environment variables
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### 2. Security Headers
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];
```

### 3. Performance Optimization
```javascript
// Enable compression
app.use(compression());

// Static file caching
app.use(express.static('public', {
  maxAge: '1d'
}));
```

## 🚦 Health Checks

### Backend Health Check
```javascript
// Add to server.js
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### Frontend Health Check
```javascript
// pages/api/health.js
export default function handler(req, res) {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
}
```

## 🔍 Monitoring

### Error Tracking
- **Sentry**: Free error tracking
- **LogRocket**: Session replay
- **Vercel Analytics**: Built-in analytics

### Performance Monitoring
- **Vercel Speed Insights**: Core Web Vitals
- **GTmetrix**: Performance audits
- **Lighthouse**: Automated testing

## 📝 Deployment Checklist

- [ ] Database schema deployed
- [ ] Environment variables configured
- [ ] CORS settings updated
- [ ] SSL certificates active
- [ ] Health checks responding
- [ ] Error tracking configured
- [ ] Performance monitoring active
- [ ] Domain configured (if custom)
- [ ] Security headers implemented
- [ ] Database backups enabled

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**
   ```javascript
   // Update CORS origin in backend
   origin: ['https://your-frontend-domain.vercel.app']
   ```

2. **Environment Variables Not Loading**
   ```bash
   # Check Vercel dashboard
   # Redeploy after adding variables
   ```

3. **Database Connection Issues**
   ```javascript
   // Verify Supabase URL and keys
   // Check network policies
   ```

4. **Build Failures**
   ```bash
   # Check build logs
   # Verify package.json dependencies
   # Update Node.js version if needed
   ```

For detailed troubleshooting, check the individual service documentation and logs.