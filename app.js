const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { PORT = 3000 } = process.env;
const app = express();
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');

//const publicPath = path.join(__dirname, 'public');
//app.use(express.static(publicPath))

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicPath));

app.use((req, res, next) => {
  req.user = {
    _id: '5f7a0f48052cec26f0900ee1'
  }
  next()
})

app.use('/users', users);
app.use('/cards', cards);
app.get('*', (req, res) => {
  res.status(404).send({ "message": "Requested resource not found" })
});
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
})
