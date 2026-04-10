const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const connectDB = require('./config/db')
const errorHandler = require('./middleware/errorHandler')
const contactRoutes = require('./routes/contact')

dotenv.config()

connectDB()

const app = express()

app.use(cors({
  origin: function (origin, callback) {

    if (!origin) return callback(null, true)


    if (origin.startsWith('http://localhost')) {
      return callback(null, true)
    }


    if (origin.endsWith('.vercel.app')) {
      return callback(null, true)
    }


    if (process.env.CLIENT_URL && origin === process.env.CLIENT_URL) {
      return callback(null, true)
    }

    console.log('CORS blocked origin:', origin)
    return callback(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

// handle preflight requests
app.options('*', cors())

// ── Middleware ─────────────────────────────────────────────────
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ── Routes ─────────────────────────────────────────────────────
app.use('/api/contact', contactRoutes)

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 Portfolio API is running',
    env: process.env.NODE_ENV,
  })
})

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`
  })
})

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})