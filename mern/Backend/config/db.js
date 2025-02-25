const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ayansangani3004:4hpUCCo2HM9tIYjV@cluster0.mf1we.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

const db = mongoose.connection

db.once('open', (err)=>{
    console.log(err ? err : "MongoDB Connected Successfully");
})