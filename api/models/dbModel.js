var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
    Name: {
        type: String,
        required: 'Kindly enter the name of the task'
    },
    Address:{
        type: String,
        required: 'Kindly enter the address of the task'
    }
});

module.exports = mongoose.model('Tasks', TaskSchema);