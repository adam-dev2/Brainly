const express = require('express')
const cors = require('cors')
require('dotenv').config();

const authRoutes = require('./routes/authRoutes')
const cardRoutes = require('./routes/cardRoutes')
const aiRoutes = require('./routes/ai')
const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 5001;
const app = express();

console.log(process.env.FRONTEND_URL)

app.use(
  cors({
    origin: [`${process.env.FRONTEND_URL}`],
    credentials: true,
  })
);

app.use(express.json())

app.get('/',(req,res) => {
  return res.status(200).json({message: "Server is up running healthy"})
})

app.use('/api/auth',authRoutes)
app.use('/api/cards',cardRoutes)
app.use('/api/ai', aiRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`)
})