const mongoose = require('mongoose');
const { schema } = mongoose;

const ProductSchema = new Schema({
    
    imageUrl: { type: String, required: true },
    titel: { type: String, required: true },
    price: { type: Number, required: true }, 

});

module.exports = mongoose.model('Product', ProductSchema);