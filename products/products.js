const { Schema, model } = require("mongoose");

const productSchema = Schema({
    p_id: {
        type: String,
        required: true,
        unique: true,
    },
    p_name: {
        type: String,
        required: true,
    },
    p_price: {
        type: Number,
        required: true,
    },
    p_desc: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

module.exports = model('Product', productSchema);
