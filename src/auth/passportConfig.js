import jwt from 'jsonwebtoken'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import UserModel from '../models/User.js'
import 'dotenv/config'

const secretKey = process.env.SECRET_KEY

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await UserModel.findOne({ email: profile.emails[0].value })
      if (user) {
        const token = jwt.sign(
          {
            _id: user._id
          },
          secretKey,
          {
            expiresIn: '30d'
          }
        )

        return done(null, token)
      } else {
        return done('User not found', null)
      }
    } catch (error) {
      return done(error, null)
    }
  }
  )
)

export default passport
