const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskname:{
        type: String,
        require: true,
    },
    completed:{
        type: Boolean,
        default: false,
    },
    description:{
        type: String,
        default: null,
    },
    duedate:{
        type: Date,
        require: true,
    },
    period:{
        type: String,
        require: true,
    },
    periodtype:{
        type: String,
        require:true
    }
});

module.exports = mongoose.model("tasklist", taskSchema);