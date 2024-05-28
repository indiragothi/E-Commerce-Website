const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToMongoDB = require('./db/connectToMongoDB')

const userRoutes = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const cartRoutes = require('./routes/cartRoute')

const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config();

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true,
}));

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', userRoutes)
app.use('/product', productRoute)
app.use('/cart', cartRoutes)


app.listen(PORT, ()=>{
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
})