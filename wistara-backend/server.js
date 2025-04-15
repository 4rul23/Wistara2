import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import prisma from './prisma/client.js';
import authRoutes from './src/routes/authRoutes.js';
import destinationRoutes from './src/routes/destinationRoutes.js';
import commentRoutes from './src/routes/commentRoutes.js';

dotenv.config();

// ES modules specific setup for __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Make prisma available globally
app.locals.prisma = prisma;

// Setup Session Store dengan PostgreSQL
const PgSession = pgSession(session);

// CORS HARUS DIKONFIGURASI SEBELUM MIDDLEWARE LAIN
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // URL frontend Next.js
  credentials: true, // PENTING! Ini mengizinkan credentials (cookies) dikirim
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Helmet dengan konfigurasi yang kompatibel dengan CORS
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// Session HARUS SETELAH CORS, SEBELUM ROUTE HANDLERS
app.use(session({
  store: new PgSession({
    conObject: {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    },
    tableName: 'sessions'
  }),
  secret: process.env.SESSION_SECRET || 'wistara_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS di production
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 hari
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' // Penting untuk cross-site cookies
  }
}));

// Global Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Route khusus untuk testing CORS
app.get('/api/test-cors', (req, res) => {
  res.json({
    message: 'CORS is working properly!',
    session: req.session.id ? 'Active' : 'Not set'
  });
});

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/destinations', destinationRoutes);

app.use('/api/comments', commentRoutes); // PENTING: Tambahkan baris ini!

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Wistara API',
    version: '1.0.0',
    status: 'active'
  });
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`CORS enabled for origin: http://localhost:3000`);
});

// Handle clean shutdown
process.on('SIGINT', async () => {
  console.log('Closing Prisma Client connection');
  await prisma.$disconnect();
  process.exit(0);
});

export default app;
