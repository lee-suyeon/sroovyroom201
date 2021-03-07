const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');

const mongoose = require('mongoose');

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true, 
  useFindAndModify: false
}).then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

// router
app.use('/api/users', require('./routes/users'));
app.use('/api/visitors', require('./routes/visitors'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

