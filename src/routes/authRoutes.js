import express from 'express'
import { registerValidation } from '../middlewares/validations/registerUserValidation.js'
import handleValidationErrors from '../middlewares/handleValidationErrors.js'
import { login, register } from '../controllers/authController.js'
import { loginValidation } from '../middlewares/validations/loginUserValidation.js'
import passport from '../auth/passportConfig.js'

const router = express.Router()

router.post('/register', registerValidation, handleValidationErrors, register)

router.post('/login', loginValidation, handleValidationErrors, login)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = req.user
    res.redirect(`http://localhost:3000/?token=${token}`)
  }
)

export default router
