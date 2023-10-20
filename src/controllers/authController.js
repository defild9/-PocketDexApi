import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import 'dotenv/config'

import UserModel from '../models/User.js'

export const register = async (req, res) => {
  try {
    const password = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const secretKey = process.env.SECRET_KEY

    const doc = new UserModel({
      username: req.body.username,
      email: req.body.email,
      passwordHash: hash
    })

    const user = await doc.save()

    const token = jwt.sign(
      {
        _id: user._id
      },
      secretKey,
      {
        expiresIn: '30d'
      }
    )

    const { passwordHash, ...userData } = user._doc

    res.json({
      ...userData,
      token
    }
    )
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Failed to register'
    })
  }
}

export const login = async (req, res) => {
  const secretKey = process.env.SECRET_KEY
  try {
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
      return req.status(404).json({
        message: 'User not found'
      })
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
    if (!isValidPass) {
      return req.status(400).json({
        message: 'Invalid login or password'
      })
    }

    const token = jwt.sign(
      {
        _id: user._id
      },
      secretKey,
      {
        expiresIn: '30d'
      }
    )

    const { passwordHash, ...userData } = user._doc

    res.json({
      ...userData,
      token
    }
    )
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Failed to authorise'
    })
  }
}
