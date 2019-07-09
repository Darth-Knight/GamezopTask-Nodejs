const express = require('express');
const Constants = require('constants');
const throng = require('throng');

throng({
    workers: 1,//Constants.WORKERS,
    lifetime: Infinity,
    grace: 5000,
    master: function() {},
    start: childProcess
});

function childProcess() {
    const app = express()
    const mongoose = require('mongoose')
    const Task = require('./api/models/dbModel') //created model loading here
    const bodyParser = require('body-parser')
    const cors = require('cors')
    const messageQueue = require('./api/lib/rabbit-mq');
    messageQueue.startConsuming();
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/Tododb');
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors())

    app.get('/ping', function (req, res) {
        return res.send('PONG')
    })

    var routes = require('./api/routes/dbRouter');
    app.use('/todo', routes);

    app.set('port', (process.env.PORT_NODE || 3000));
    app.listen(app.get('port'));
}