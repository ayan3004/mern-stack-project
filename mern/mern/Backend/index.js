const express = require('express');
const app = express();
const PORT = 5000

const db = require('./config/db');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded())
app.use(cors({origin : 'http://localhost:5173',credentials:true}));

app.use("/", require('./routes'))

app.listen(PORT, (err)=>{
    if(err) console.log(err);
    else console.log("Server started on" + PORT);
})
