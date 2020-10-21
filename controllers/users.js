const User = require('../models/User');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Error' }))
}
module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      (user === null) ? res.status(404).send({ message: 'user not found' }) : res.send({ data: user })
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'user not found' })
      }
      res.status(500).send({ message: 'Error' })
    })
}
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => {
      console.log(err.name)
      if (err.name == 'ValidationError') {
        res.status(400).send({ message: 'invalid data passed to the methods for creating a user' })
      }
      res.status(500).send({ message: 'Error' })
    })
}