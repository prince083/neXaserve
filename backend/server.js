const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

//route imports
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const roleRoutes = require('./routes/roleRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');


const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

//connect to mongodb
mongoose.connect(MONGODB_URI).then(()=>{
    console.log("Connected to mongodb");
}).catch((err)=>{
    console.log("Error connecting to mongodb:", err);
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})

