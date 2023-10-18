import { body } from 'express-validator'

export const loginValidation = [
  body('email', 'Incorrect mail format').isEmail(),
  body('password', 'Password must be a minimum of 5 characters').isLength({ min: 5 })
]
