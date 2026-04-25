import express, { Application } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { connect } from './config/db';
import add from './api/add'
dotenv.config();
const app: Application = express();

app.use(cors({
    origin: true,
    credentials: true
}));


app.use(express.json())
// app.options(/.*/, cors());

connect();

app.use('/api', add)

app.get("/", (req, res) => {
    res.send("Hello World")
})

// 404 handler LAST
app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});

const isVercel = process.env.VERCEL === "1";

if (!isVercel) {
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server running");
    });
}

export default app;