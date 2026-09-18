const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
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
    await mongoose.connect('mongodb+srv://saikat:saikat1998@cluster0.dhcvisx.mongodb.net/?appName=Cluster0', {
        dbName: 'UsersDb'
    });
}
connectDB().catch((err)=>console.error(err))

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP'
  });
});