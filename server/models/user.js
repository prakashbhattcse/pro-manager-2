const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    storeEmails: {
        type: Array
    },
},
    { timestamps: { createdAt: "Created At", updatedAt: "Updated At"} }

)

module.exports = mongoose.model("User", userSchema);