import express, { Application } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { connect } from './config/db';
import add from './api/add'
dotenv.config();
const app: Application = express();

app.use(cors({
    origin: ['http://localhost:3000', 'https://smart-crud-umber.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json())
app.options(/.*/, cors());
connect();

app.use('/api', add)

app.get("/", (req, res) => {
    res.send("Hello World")
})

// 404 handler LAST
app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})