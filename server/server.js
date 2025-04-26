const express = require('express')
const cors = require('cors')
require('dotenv').config();

const authRoutes = require('./routes/authRoutes')
const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 5001;
const app = express();

app.use(cors());
app.use(express.json())


app.use('/api/auth',authRoutes);
app.use('/api/card')

app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`)
})