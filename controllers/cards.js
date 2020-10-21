const Card = require('../models/Card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Error' }))
}
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'invalid data passed to the methods for creating a card' })
      } res.status(500).send({ message: 'Error' })
    })
}
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then(card => {
      (card === null) ? res.status(404).send({ message: 'card not found' }) : res.send({ data: card })
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'card not found' })
      }
      res.status(500).send({ message: 'Error' })
    })
}