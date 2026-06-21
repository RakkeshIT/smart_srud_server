import express, { Application } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { connect } from './config/db';
import add from './api/add'
import syllabus from './api/syllabus'
dotenv.config();
const app: Application = express();

const ALLOW_ORIGIN = [
    process.env.CLIENT_URL!,
    process.env.CLIENT_URL_PROD!,
]
app.use(cors({
    origin: ALLOW_ORIGIN,
    credentials: true,
}));


app.use(express.json())
// app.options(/.*/, cors());

// connect();

app.use('/api', add)
app.use('/api', syllabus)


app.get('/', (req, res) => {
    res.send('server running')
})


// 404 handler LAST
app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});

const isVercel = process.env.VERCEL === "1";

if (!isVercel) {
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server running", process.env.PORT);
    });
}

export default app;