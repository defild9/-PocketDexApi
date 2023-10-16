import { body } from 'express-validator'

export const registerValidation = [
  body('username', 'Minimal length for username is 5 characters').isLength({ min: 3 }),
  body('email', 'Incorrect mail format').isEmail(),
  body('password', 'Password must be a minimum of 5 characters').isLength({ min: 5 }),
  body('createAt', 'Incorrect date format').optional().isDate(),
  body('pokemonCollection', 'Incorrect collection format (specify array)').optional().isArray()
]
