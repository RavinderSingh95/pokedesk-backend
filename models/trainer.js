const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const trainerSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
      },
      message: 'Invalid email format'
    }
  },
  password: {
    type: String,
    required: true
  }
});


// Hash the password before saving it to the database
trainerSchema.pre('save', async function (next) {
    try {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);
      // Hash the password with the salt
      const hashedPassword = await bcrypt.hash(this.password, salt);
      // Replace the plain password with the hashed password
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });


const Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;
