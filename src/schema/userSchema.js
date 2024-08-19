const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        lowercase: true,
        trim: true,
        maxlength: [20, "First name should be less than or equal to 20 characters"]
    },
    lastName: {
        type: String,
        lowercase: true,
        trim: true,
        maxlength: [20, "Last name should be less than or equal to 20 characters"]
    },
    mobileNumber: {
        type: String,
        trim: true,
        maxlength: [10, "Phone number should be of length 10"],
        minlength: [10, "Phone number should be of length 10"],
        unique: [true, "Phone number is already in use"],
        required: [true, "Phone number should be provided"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email should be provided"],
        unique: [true, "Email is already in use"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password should be provided"],
        minlength: [6, "Password should be at least 6 characters long"]
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
    avatar:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
}, {
    timestamps: true
});

// Hash the password before saving the user
userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
    }
});

const User = mongoose.models.User || mongoose.model('User', userSchema); // Prevents overwriting

module.exports = User;
