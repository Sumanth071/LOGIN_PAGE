const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://ksumanthyadav120:Sumanth-db@suman.1lwpnwk.mongodb.net/signup?retryWrites=true&w=majority&appName=Suman', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});


const User = mongoose.model('User', userSchema);


app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });

  try {
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    res.status(500).send('Error registering user');
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
