const bcrypt = require('bcrypt')
const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')

const { User } = require('../../models')
const { JWT_SECRET } = require('../../config/env.json')

module.exports = {
  Query: {
    getUsers: async (_, __, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated')

        const users = await User.findAll({
          where: { username: { [Op.ne]: user.username } },
        })
        return users
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    login: async (_, args) => {
      const { username, password } = args
      let errors = {}

      try {
        if (username.trim() === '')
          errors.username = 'username must not be empty'
        if (password === '') errors.password = 'password must not be empty'

        if (Object.keys(errors).length > 0)
          throw new UserInputError('bad input', { errors })

        const user = await User.findOne({
          where: { username },
        })

        if (!user) {
          errors.username = 'user not found'
          throw new UserInputError('user not found', { errors })
        }

        const correctPassword = await bcrypt.compare(password, user.password)

        if (!correctPassword) {
          errors.password = 'password is incorrect'
          throw new UserInputError(`password is incorrect`, {
            errors,
          })
        }

        // If this point is reached, the user credentials are valid
        const token = jwt.sign(
          {
            username,
          },
          JWT_SECRET,
          { expiresIn: '1h' }
        )

        return {
          ...user.toJSON(),
          createdAt: user.createdAt.toISOString(),
          token,
        }
      } catch (err) {
        console.log(err)
        throw err
      }
    },
  },
  Mutation: {
    // https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments
    // register: async (parent, args, context, info) => {},
    register: async (_, args) => {
      let { username, email, password, confirmPassword } = args
      let errors = {}

      try {
        // Validate input data
        if (email.trim() === '') errors.email = 'Email must not be empty'
        if (username.trim() === '')
          errors.username = 'Username must not be empty'
        if (password.trim() === '')
          errors.password = 'Password must not be empty'

        if (password !== confirmPassword)
          errors.confirmPassword = 'Passwords must match'

        // these are unnesisarry as the user models handle the validiation with "unique: true" for username & email
        // and "validate: {isEmail}" for the email
        // // Check if username /email exists
        // const userAlreadyExists = await User.findOne({ where: { username } })
        // const emailIsAlreadyUsed = await User.findOne({ where: { email } })

        // if (userAlreadyExists) errors.username = 'Username is taken'
        // if (emailIsAlreadyUsed) errors.email = 'Email is taken'

        if (Object.keys(errors).length > 0) {
          throw errors
        }

        // Hash password
        password = await bcrypt.hash(password, 6)

        // Create user
        const user = await User.create({
          username,
          email,
          password,
        })

        // Return user
        return user
      } catch (err) {
        console.log(err)
        if (err.name === 'SequelizeUniqueConstraintError') {
          err.errors.forEach(
            (e) => (errors[e.path] = `${e.path} is already taken`)
          )
        } else if (err.name === 'SequelizeValidationError') {
          err.errors.forEach((e) => (errors[e.path] = e.message))
        }
        throw new UserInputError('Bad input', { errors })
      }
    },
  },
}
