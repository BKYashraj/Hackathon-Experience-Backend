const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
  PaperTitle: {
    type: String,
    required: [true, "Paper Title is required"],
    minlength: [5, "Paper Title must be at least 5 characters long"],
    trim: true,
  },
  Domain: {
    type: String,
    required: [true, "Domain is required"],
    trim: true,
  },
  Abstract: {
    type: String,
    required: [true, "Abstract is required"],
    trim: true,
  },
  AuthorsNames: {
    type: String,
    required: [true, "Authors' names are required"],
    trim: true,
  },
  mentorName: {
    type: String,
    required: [true, "Mentor name is required"],
    enum: ['Priya Rakibe', 'Gondhalekar', 'Smita Patil'], // Adapted from original
    trim: true,
  },
  InstituteName: {
    type: String,
    required: [true, "Institute name is required"],
    trim: true,
  },
  JournalName: {
    type: String,
    required: [true, "Journal name is required"],
    trim: true,
  },
  overallExperience: {
    type: String,
    required: [true, "Overall Experience is required"],
    trim: true,
  },
  keyTipsForJuniors: {
    type: String,
    required: [true, "Key Tips for Juniors are required"],
    trim: true,
  },
  Conclusion: {
    type: String,
    required: [true, "Conclusion is required"],
    trim: true,
  },
  winningPhoto: {
    type: String, // This will store the URL to the uploaded photo
    trim: true,
  },
  PaperLink: {
    type: String, // This will store the link to the paper or project demo
    trim: true,
  }
}, {
  timestamps: true,
});

const PaperExperience = mongoose.model('PaperExperience', paperSchema);

module.exports = PaperExperience;
