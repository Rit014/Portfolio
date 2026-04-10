const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const connectDB = require('./config/db')
const errorHandler = require('./middleware/errorHandler')
const contactRoutes = require('./routes/contact')

// ── Load env variables ────────────────────────────────────────────────────────
dotenv.config()

// ── Connect to MongoDB ────────────────────────────────────────────────────────
connectDB()

// ── Init Express ──────────────────────────────────────────────────────────────
const app = express()

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/contact', contactRoutes)

// Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 Portfolio API is running',
    env: process.env.NODE_ENV,
  })
})

// 404 handler — unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route ${req.originalUrl} not found` })
})

// ── Global error handler ──────────────────────────────────────────────────────
app.use(errorHandler)

// ── Start Server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})