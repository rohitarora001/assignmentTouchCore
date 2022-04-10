const mongoose = require('mongoose')

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fields: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Fields'
    },
},
    { timestamps: true }
)

const Forms = mongoose.model("Forms", formSchema);
module.exports = Forms;