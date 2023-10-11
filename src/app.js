const express = require('express');
const app = express();
const port = 3000;
const host = '0.0.0.0';

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/musiquevote");

app.use(express.urlencoded());
app.use(express.json());


const musicRoute = require('./routes/musiqueRoute');
const voteRoute = require('./routes/voteRoute');

app.use('/musics', musicRoute);
app.use('/', voteRoute);
//app.use('/result', musicRoute);



app.listen(port, host);