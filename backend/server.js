const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path')

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser:true} );

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connected to DataBase");
})

const authRouter = require('./routes/auth');
const discover = require('./routes/discover')

//Middlewares
app.use(cookieParser());
app.use('/auth', authRouter);
app.use('/', discover);

if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT} "`);
})