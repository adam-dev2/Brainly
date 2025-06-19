const express = require('express')
const cors = require('cors')
require('dotenv').config();

const authRoutes = require('./routes/authRoutes')
const cardRoutes = require('./routes/cardRoutes')
const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 5001;
const app = express();

app.use(
  cors({
    origin: "https://brain-companion.vercel.app",
    credentials: true,
  })
);
app.use(express.json())


app.use('/api/auth',authRoutes)
app.use('/api/cards',cardRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`)
})