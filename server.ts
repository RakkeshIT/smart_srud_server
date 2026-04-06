import express, { Application } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { connect } from './config/db';
import add from './api/add'
dotenv.config();
const app: Application = express();

app.use(cors());
app.use(express.json())

connect();

app.use('/api/add', add)

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})