import express from 'express'
import { registerValidation } from '../middlewares/validations/registerUserValidation.js'
import handleValidationErrors from '../middlewares/handleValidationErrors.js'
import { login, register } from '../controllers/authContoller.js'
import { loginValidation } from '../middlewares/validations/loginUserValidation.js'

const router = express.Router()

router.post('/register', registerValidation, handleValidationErrors, register)

router.post('/login', loginValidation, handleValidationErrors, login)

export default router
