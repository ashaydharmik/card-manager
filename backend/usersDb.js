const mongoose = require('mongoose');
const User = require('./Models/userModel'); 
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGODB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  const userData = require('./users.json'); 
  User.insertMany(userData)
    .then(() => {
      console.log('Data inserted successfully');
    })
    .catch(err => {
      console.error('Error inserting data:', err);
    });
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
