const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const rateLimit = require('express-rate-limit')

const Message = require("./../modules/Message")
const { sendContactEmail, sendAutoReply } = require('../config/mailer')

// ── Rate limiter: max 5 requests per 15 minutes per IP ──────────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: false,
    error: 'Too many messages sent. Please try again after 15 minutes.',
  },
})

// ── Validation rules ─────────────────────────────────────────────────────────
const validateContact = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name too long'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Enter a valid email address')
    .normalizeEmail(),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
    .isLength({ max: 2000 }).withMessage('Message too long'),
]

// ── POST /api/contact ─────────────────────────────────────────────────────────
// @desc   Receive contact form, save to DB, send emails
// @access Public
router.post('/', contactLimiter, validateContact, async (req, res, next) => {
  // Check validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: errors.array()[0].msg,
    })
  }

  const { name, email, message } = req.body

  try {
    // 1. Save message to MongoDB
    const newMessage = await Message.create({ name, email, message })

    // 2. Send notification email to portfolio owner
    await sendContactEmail({ name, email, message })

    // 3. Send auto-reply to the sender
    await sendAutoReply({ name, email })

    res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      data: { id: newMessage._id },
    })
  } catch (error) {
    next(error) // passes to errorHandler middleware
  }
})

// ── GET /api/contact ──────────────────────────────────────────────────────────
// @desc   Get all messages (for your own admin use)
// @access Private (add auth middleware here later)
router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router