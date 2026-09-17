const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes')
const cors = require('cors');

app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.json());
app.use(userRoutes)


async function connectDB() {
    await mongoose.connect('mongodb://localhost:27017', {
        dbName: 'UsersDb'
    })
}
connectDB().catch((err)=>console.error(err))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})