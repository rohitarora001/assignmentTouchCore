const mongoose = require('mongoose')

const fieldSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'text'
    }
},
    { timestamps: true }
)

const Fields = mongoose.model("Fields", fieldSchema);
module.exports = Fields;