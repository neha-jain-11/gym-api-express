const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const RegisterSchema = require('./models/register');
require('dotenv/config');

const port = process.env.port;

const app = express();
const db = mongoose.connection;
app.use(bodyParser.json());
// app.use(cors());
app.use(cors({
        origin: 'http://localhost:8080'
      }));


app.post('/api/register', async(req, res) => {
    console.log('body', req.body);
    const register = new RegisterSchema({
        name : req.body.name,
        password : req.body.password,
        contactNumber : req.body.contactNumber
    });
    console.log('after body');
    await register.save()
            .then(data => {
                console.log('data', data);
                res.json(data);
            })
            .catch(err => {
                console.log('error');
                res.json({ 'message' : err });
            });
            
    console.log('after await');
});

app.get('/api/users', async(req, res) => {
    console.log('get all data');
    const data = await db.collection('users').find().toArray();
    res.send(data);
});

app.get('/api/user/:id', async(req, res) => {
    console.log(`get data for ${req.params.id}`);
    const users = db.collection('users');
    console.log(users);
    await users.findOne({ 'contactNumber' : `${req.params.id}` })
                .then(data => {
                    console.log('data', data);
                    res.json(data);
                })
                .catch(err => {
                    console.log('error', err);
                });
    
});

app.get('/api/user/:id', async(req, res) => {
    console.log(`get data for ${req.params.id}`);
    const users = db.collection('users');
    console.log(users);
    await users.findOne({ 'contactNumber' : `${req.params.id}` })
                .then(data => {
                    console.log('data', data);
                    res.json(data);
                })
                .catch(err => {
                    console.log('error', err);
                });
    
});

app.get('/api/user/:id', async(req, res) => {
    console.log(`get data for ${req.params.id}`);
    const users = db.collection('users');
    console.log(users);
    await users.findOne({ 'contactNumber' : `${req.params.id}` })
                .then(data => {
                    console.log('data', data);
                    res.json(data);
                })
                .catch(err => {
                    console.log('error', err);
                });
    
});


mongoose.connect(process.env.DB_CONNECTION,
{ useNewUrlParser: true },
() => {
    console.log('Db is connected');
});

app.delete('/api/user/:id', async(req, res) => {
    console.log(`delete data for ${req.params.id}`);
    const users = db.collection('users');
    await users.remove({ 'contactNumber' : `${req.params.id}` })
                .then(data => {
                    console.log('data', data);
                    res.json({"message" : "deleted successfully"});
                })
                .catch(err => {
                    console.log('error', err);
                });
    
});


app.patch('/api/user/:id', async(req, res) => {
    console.log(`patch data for ${req.params.id}`);
    console.log(req.body);
    const users = db.collection('users');
    await users.updateOne(
        { 'contactNumber' : `${req.params.id}` },
        {
            $set: req.body
        }
    )
                .then(data => {
                    console.log('data', data);
                    res.json({"message" : "updated successfully"});
                })
                .catch(err => {
                    console.log('error', err);
                });
    
});



mongoose.connect(process.env.DB_CONNECTION,
{ useNewUrlParser: true },
() => {
    console.log('Db is connected');
});


db.once('open', function () {
    console.log('neha');
});

app.listen(port, () => {
    console.log(`started on port - ${port}`);
});