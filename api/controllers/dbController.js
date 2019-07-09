var mongoose = require('mongoose');
const TaskModel = mongoose.model('Tasks');


var list_all_tasks = function (callback) {
    TaskModel.find({}, function(err, task) {
        if (err)
            return callback(err, null);
        return callback(null, task);
    });
};

var create_a_task = function (data, callback) {
    var new_task = new TaskModel(data);
    new_task.save(function(err, task) {
        if (err)
            return callback(err, null);
        return callback(null, task);
    });
};


var read_a_task = function (req, callback) {
    TaskModel.findById(req.params.taskId,function(err, task) {
        if (err)
            return callback(err, null);
        return callback(null, task);
    });
};

var update_a_task = function (req, callback) {
    TaskModel.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true},function(err, task) {
        if (err)
            return callback(err, null);
        return callback(null, task);
    });
};

var delete_a_task = function (req, callback) {
    TaskModel.remove({_id: req.params.taskId},function(err, task) {
        if (err)
            return callback(err, null);
        return callback(null, { message: 'Task successfully deleted' });
    });
};


module.exports = {
    list_all_tasks : list_all_tasks,
    create_a_task : create_a_task,
    read_a_task:read_a_task,
    update_a_task:update_a_task,
    delete_a_task:delete_a_task
};

