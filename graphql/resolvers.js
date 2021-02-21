const bcrypt = require('bcrypt')
const { UserInputError } = require('apollo-server')

const { User } = require('../models')

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.findAll()
        return users
      } catch (err) {
        console.log(err)
      }
    },
  },
  Mutation: {
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
        throw new UserInputError('Bad input', { errors: err })
      }
    },
  },
}