const jwt = require('jsonwebtoken')
const { PubSub } = require('apollo-server')
require('dotenv').config()

const pubsub = new PubSub()

module.exports = (context) => {
  // let newContext = context
  let token
  if (context.req?.headers.authorization) {
    token = context.req.headers.authorization.split('Bearer ')[1]
  } else if (context.connection?.context.Authorization) {
    token = context.connection.context.Authorization.split('Bearer ')[1]
  }

  if (token) {
    context.user = jwt.verify(token, process.env.JWT_SECRET)
  }

  // console.log(token)

  context.pubsub = pubsub

  return context
}
