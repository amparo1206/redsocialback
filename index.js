const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")

const { MONGO_URI } = require("./config/keys");
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("conectado a mongoDB con éxito"))
  .catch((err) => console.error(err));

app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));

app.listen(PORT, console.log(`Server started on port ${PORT}`));