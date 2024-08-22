const mongoose = require('mongoose');

const hackathonExperienceSchema = new mongoose.Schema({
  hackathonName: {
    type: String,
    required: [true, "Hackathon Name is required"],
    // minlength: [3, "Hackathon Name must be at least 3 characters long"],
    trim: true,
  },
  title: {
    type: String,
    required: [true, "Project Title is required"],
    // minlength: [5, "Project Title must be at least 5 characters long"],
    trim: true,
  },
  themeOrDomain: {
    type: String,
    required: [true, "Theme/Domain is required"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ['Software', 'Hardware', 'Other'],
    trim: true,
  },
  mentorName: {
    type: String,
    enum: ['Priya Rakibe', 'Gondhalekar', 'smita Patil'],
    required: [true, "Mentor name is required"],
    trim: true,
  },
  teamMembersNames: {
      type: String,
      required: [true, "Team member name is required"],
      trim: true,
    },
  techStack: [{
    type: String,
    // required: [true, "Tech Stack is required"],
    trim: true,
  }],
  overallExperience: {
    type: String,
    required: [true, "Overall Experience is required"],
    // minlength: [10, "Overall Experience must be at least 20 characters long"],
    trim: true,
  },
  challenges: {
    type: String,
    required: [true, "Challenges faced is required"],
    // minlength: [10, "Challenges must be at least 20 characters long"],
    trim: true,
  },
  // highlights: {
  //   type: String,
  //   required: [true, "Highlights are required"],
  //   // minlength: [10, "Highlights must be at least 20 characters long"],
  //   trim: true,
  // },
  winningPhoto: {
    type: String, // URL to the photo
    trim: true,
  },
  keyTipsForJuniors: {
    type: String,
    required: [true, "Key tips for juniors are required"],
    // minlength: [10, "Key tips must be at least 10 characters long"],
    trim: true,
  },
  projectDemoLink: {
    type: String, // URL to the project demo
    trim: true,
  },
  userRef:{
    type: String,
    required: true,
  }
},{
  timestamps: true,
});

const HackathonExperience = mongoose.model('HackathonExperience', hackathonExperienceSchema);

module.exports = HackathonExperience;