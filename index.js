import express from 'express'
import mongoose from 'mongoose'; 
import recordrouter from './routes/record.js'
import User from './routes/user.js'
import loginrouter from './routes/authentication.js'
import aggregateRouter from './routes/aggregate.js'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
const app = express();
app.use(cors({
    origin:"http://localhost:8080",
    credential: true
}))
const Port = process.env.PORT;


async function dbconnection(params) {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connection Successful!");
    } catch (err) {
        console.log(err);
    }
}
dbconnection();


app.use(express.json());
app.use(express.urlencoded());
// Routing handling
app.use('/user',User);
app.use('/record', recordrouter);
app.use('/login',loginrouter)
app.use('/aggregate',aggregateRouter);


app.listen(Port, () => {
    console.log("Server is Running",Port);
})