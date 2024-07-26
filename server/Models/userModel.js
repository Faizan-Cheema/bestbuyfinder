import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Method to match passwords (without hashing)
userSchema.methods.matchPassword = function (password) {
    return this.password === password;
};

const User = mongoose.model('User', userSchema);

export default User;
