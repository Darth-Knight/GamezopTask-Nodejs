const router = require('express').Router();
const todoList = require('../controllers/dbController');


router.get('/tasks', function (req, res) {
    return todoList.list_all_tasks(function (err, data) {
        if (err) {
            console.log(err);
            return res.send('Error');
        }
        return res.json(data)
    })
});

router.post('/tasks', function (req, res) {
    return todoList.create_a_task(req.body,function (err, data) {
        if (err) {
            console.log(err);
            return res.send('Error');
        }
        return res.json(data)
    })
});


router.get('/tasks/:taskId', function (req, res) {
    return todoList.read_a_task(req,function (err, data) {
        if (err) {
            console.log(err);
            return res.send('Error');
        }
        return res.json(data)
    })
});

router.post('/tasks/:taskId', function (req, res) {
    return todoList.update_a_task(req,function (err, data) {
        if (err) {
            console.log(err);
            return res.send('Error');
        }
        return res.json(data)
    })
});

router.delete('/tasks/:taskId', function (req, res) {
    return todoList.delete_a_task(req,function (err, data) {
        if (err) {
            console.log(err);
            return res.send('Error');
        }
        return res.json(data)
    })
});

module.exports = router;
