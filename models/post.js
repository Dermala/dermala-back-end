const mongoose = require('mongoose');
const { schema } = mongoose;

const PostSchema = new Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    
    createdBy: { type: Schema.Types.objectId, ref: 'User' },
    postDate: { type: Schema.Types.objectId, ref: 'Date' },
    rating: [{ type: Number, required: true }],

    notes: [{ type: Schema.Types.objectId, ref: 'Notes' }]
});

module.exports = mongoose.model('Post', PostSchema);