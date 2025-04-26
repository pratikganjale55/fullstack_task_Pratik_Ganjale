const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  tasks: [
    {
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('TaskBackup', taskSchema);