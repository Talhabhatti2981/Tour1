
import experss from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';


dotenv.config();
const app = experss();
const port = process.env.PORT || 8000;



mongoose.set("strictQuery", false);
//database connection
const connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000,
            connectTimeoutMS: 30000,
            family: 4,
        });
        console.log("MongoDB database connected");
    } catch (err) {
        console.log("MongoDB database connection failed");
        console.error(err.message);
    }
};

// middlewere
app.use(experss.json());
app.use(cors());
app.use(cookieParser());


app.listen(port, ()=>{
    connect();
    console.log("server listening on port", port);
});