const express = require('express');
const router = express.Router();
const Trainer = require('../models/trainer');


router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await Trainer.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new Trainer({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await Trainer.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }



      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

module.exports = router;
