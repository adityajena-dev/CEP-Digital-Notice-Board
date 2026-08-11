const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    code: {
        type: String,
        required: true,
        unique: true
    },

    teacherPassword: {
        type: String,
        required: true
    }

});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;