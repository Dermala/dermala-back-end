const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    imageUrl: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    postDate: { type: Date},
    
    rating: { type: Number, required: true },
    question1: { type: Boolean, required: false},
    question2: { type: Boolean, required: false},
    question3: { type: Boolean, required: false},
    question4: { type: Boolean, required: false},
    question5: { type: Boolean, required: false},
    question6: { type: Boolean, required: false},
    notes: { type: String, required: false }
});

module.exports = mongoose.model('Post', PostSchema);