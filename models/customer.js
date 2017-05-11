const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { schema } = mongoose;

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        lowercase: true,
        unique: true, 
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{ type: Schema.Types.objectId, ref: 'Post' }]
});

UserSchema.pre('save', hashPassword);
UserSchema.methods.comparePassword = comparePassword;

module.exports = mongoose.model('User', UserSchema);