// backend/models/Volunteer.js
const mongoose = require('mongoose')

const volunteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian phone number'],
    },
    skills: {
      type: [String],
      required: [true, 'Please select at least one skill'],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'At least one skill is required',
      },
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [20, 'Message must be at least 20 characters'],
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'accepted', 'rejected'],
      default: 'pending',
    },
    ipAddress: {
      type: String,
      select: false, // hidden from normal queries
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Index for faster email lookups
volunteerSchema.index({ email: 1 })
volunteerSchema.index({ createdAt: -1 })

// Prevent duplicate emails within 24 hours
volunteerSchema.pre('save', async function (next) {
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000)
  const existing = await this.constructor.findOne({
    email: this.email,
    createdAt: { $gte: cutoff },
  })
  if (existing) {
    const err = new Error('You have already submitted an application in the last 24 hours.')
    err.status = 429
    return next(err)
  }
  next()
})

module.exports = mongoose.model('Volunteer', volunteerSchema)
