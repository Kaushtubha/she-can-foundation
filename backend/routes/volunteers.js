// backend/routes/volunteers.js
const express = require('express')
const { body, validationResult } = require('express-validator')
const Volunteer = require('../models/Volunteer')

const router = express.Router()

// ── Validation rules ─────────────────────────────────────────
const validateVolunteer = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('phone')
    .trim()
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please provide a valid 10-digit Indian phone number'),
  body('skills')
    .isArray({ min: 1 })
    .withMessage('Please select at least one skill'),
  body('skills.*')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Each skill must be a valid string'),
  body('message')
    .trim()
    .isLength({ min: 20, max: 1000 })
    .withMessage('Message must be between 20 and 1000 characters'),
]

// ── POST /api/volunteers ──────────────────────────────────────
// Submit volunteer application
router.post('/', validateVolunteer, async (req, res) => {
  // Check validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
    })
  }

  try {
    const { name, email, phone, skills, message } = req.body

    const volunteer = new Volunteer({
      name,
      email,
      phone,
      skills,
      message,
      ipAddress: req.ip,
    })

    await volunteer.save()

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully! We will contact you within 48 hours.',
      data: {
        id: volunteer._id,
        name: volunteer.name,
        email: volunteer.email,
        submittedAt: volunteer.createdAt,
      },
    })
  } catch (err) {
    if (err.status === 429) {
      return res.status(429).json({ success: false, message: err.message })
    }
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'An application with this email already exists.',
      })
    }
    console.error('Volunteer save error:', err)
    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again.',
    })
  }
})

// ── GET /api/volunteers ───────────────────────────────────────
// Get all volunteers (protected – add auth middleware in production)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const skip = (page - 1) * limit

    const [volunteers, total] = await Promise.all([
      Volunteer.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-ipAddress'),
      Volunteer.countDocuments(),
    ])

    res.json({
      success: true,
      data: volunteers,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch volunteers.' })
  }
})

// ── GET /api/volunteers/stats ─────────────────────────────────
router.get('/stats', async (req, res) => {
  try {
    const [total, pending, accepted, thisMonth] = await Promise.all([
      Volunteer.countDocuments(),
      Volunteer.countDocuments({ status: 'pending' }),
      Volunteer.countDocuments({ status: 'accepted' }),
      Volunteer.countDocuments({
        createdAt: { $gte: new Date(new Date().setDate(1)) },
      }),
    ])

    res.json({ success: true, data: { total, pending, accepted, thisMonth } })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch stats.' })
  }
})

module.exports = router
