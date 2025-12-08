# NextGen SaaS - Backend API

Node.js/Express backend API for the NextGen SaaS website.

## 🚀 Features

- **Express.js** - Fast, minimalist web framework
- **TypeScript** - Type-safe code
- **CORS** - Cross-origin resource sharing enabled
- **Helmet** - Security headers
- **Rate Limiting** - API protection
- **Contact Form API** - Handle contact form submissions
- **Services API** - Get services data

## 📦 Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Start development server:
```bash
npm run dev
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Check server status

### Contact
- `POST /api/contact/submit` - Submit contact form
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "projectType": "saas",
    "budgetRange": "25k-50k",
    "message": "Project description"
  }
  ```

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID

## 🔧 Configuration

Edit `.env` file to configure:
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS

## 📁 Project Structure

```
backend/
├── src/
│   ├── server.ts           # Main server file
│   ├── routes/             # API routes
│   │   ├── contact.routes.ts
│   │   └── services.routes.ts
│   └── controllers/        # Route controllers
│       ├── contact.controller.ts
│       └── services.controller.ts
├── dist/                   # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── .env                    # Environment variables
```

## 🔐 Security Features

- Helmet.js for security headers
- Rate limiting to prevent abuse
- CORS configuration
- Input validation

## 🚀 Production Deployment

1. Build the project:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

Make sure to set `NODE_ENV=production` in your production `.env` file.

