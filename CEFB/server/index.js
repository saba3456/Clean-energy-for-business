const express = require('express');
const server = express();
const cors = require('cors');
const mysql = require('mysql2');
const http = require('http');
const socketIO = require('socket.io');

//enviroment variables to avoid hard coding the cridentials
require('dotenv').config();




const DB = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

//used to allow the server to get data from other ports
server.use(cors({
    origin: 'http://localhost:3000'
}))

//used to get data in JSON format
server.use(express.json());
const httpServer = http.createServer(server);
const io = socketIO(httpServer, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    socket.join(userId);
    socket.on('message', (msg) => {
        io.to(msg.chatTo).emit('message', { chatFrom: msg.chatFrom, message: msg.message });
    });
});

server.get('/checkUser/:username', (req, res) => {
    const query = `SELECT * FROM userTable WHERE username = '${req.params.username}'`;
    DB.query(query, (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (results.length > 0) {
            return res.send('User exists');
        }
        return res.send('User does not exist');
    });
});

//
server.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const reg = `INSERT INTO userTable (username, email, password) VALUES (?,?,?)`;
    DB.query(reg, [username, email, password], (error) => {
        if (error) throw error;
        res.send('User registered successfully');
    });
});

//
server.post('/login', (req, res) => {
    const { username, password } = req.body;
    const log = `SELECT * FROM userTable WHERE username = ? AND password = ?`;
    DB.query(log, [username, password], (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            return res.send('Logged in successfully');
        } else {
            return res.send('Login was unsuccessful');
        }

    });
});

server.get('/locationget/:username', (req, res) => {
    const username = req.params.username;

    const locget = `SELECT name, latitude, longitude FROM businessTable WHERE username = ?`;
    console.log(username)
    DB.query(locget, [username], (error, results) => {
        if (error) { res.status(500).send('Error getting location') }
        else if (results.length > 0) {
            console.log(results[0]);
            res.send(results[0]);
        } else {
            res.status(404).send('No location found')
        }
    });
});

server.get('/locationgetMarkers/:username', (req, res) => {
    const username = req.params.username;

    const locget = `SELECT username, name, latitude, longitude FROM businessTable WHERE username <> ?`;
    console.log(username)
    DB.query(locget, [username], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            console.log(results);
            res.send(results);
        }
    });
});

server.post('/locationset', (req, res) => {
    console.log("locationset")
    const { username, name, lat, lng } = req.body;
    const locset = `INSERT INTO businessTable (username, name, latitude, longitude) VALUES (?,?,?,?)`;
    DB.query(locset, [username, name, lat, lng], (error) => {
        if (error) throw error;
        res.send('Business data successfully entered');
    });
});

server.post('/locationUpdate', (req, res) => {
    const { username, name, lat, lng } = req.body;
    const locUpdate = `UPDATE businessTable SET name=?, latitude=?, longitude=? WHERE username=?`;
    DB.query(locUpdate, [name, lat, lng, username], (error) => {
        if (error) throw error;
        res.send('Business data successfully updated');
    });
})

server.get('/businesschat/getAllMessages/:username', (req, res) => {
    const username = req.params.username;
    const get = `SELECT chatID, chatTo, chatFrom, message FROM businessChat WHERE chatTo = ? OR chatFrom = ?`;

    DB.query(get, [username, username], (error, results) => {
        if (error) throw error;
        console.log(results)
        res.send(results);
    });
});

server.post('/businesschat/sendMessage', (req, res) => {
    console.log("sendMessage")
    console.log(req.body);
    const { chatFrom, chatTo, message } = req.body;
    const sendmsg = `INSERT INTO businessChat (chatFrom, chatTo, message) VALUES (?,?,?)`;
    DB.query(sendmsg, [chatFrom, chatTo, message], (error) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending message');
        } else {
            res.send('Message sent');
        }
    });
});

server.get('/faq/getAllQuestions', (req, res) => {
    const get = `SELECT * FROM faqTable`;

    DB.query(get, [], (error, results) => {
        if (error) throw error;
        console.log(results)
        res.send(results);
    });
});

server.post('/faq/askquestion', (req, res) => {
    const questionInput = req.body[0];
    const askq = `INSERT INTO faqTable (question, answer, qViews) VALUES (?, NULL, 0)`;
    DB.query(askq, [questionInput], (error) => {
        if (error) throw error;
        res.send('FAQ question asked successfully');
    });
});

server.listen(4000, () => {
    console.log('Server listening on port 4000');
});

httpServer.listen(5000, () => {
    console.log('Server listening on port 4000');
});
