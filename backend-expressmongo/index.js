const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const userRoute = require('./routes/users.js');
const applicationRoute = require('./routes/jobapplications.js');

const app = express();
dotenv.config();

const uri = process.env.URI;
const PORT = process.env.PORT;

//json parser, limit set to 30 MB for image transfer
app.use(express.json({
  limit: "30mb", extended: true
}));

app.use(express.urlencoded({
  limit: "30mb", extended: true
}));

app.use(cors());

// connecting to the database
async function connect() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  }
  catch (err) {
    console.error(err);
  }
}

connect();

app.use('/users', userRoute);
app.use('/job-application', applicationRoute);

app.listen(PORT, () => {
  console.log("Listening on PORT: " + PORT);
})