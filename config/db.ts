import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);

dotenv.config();

export const connect = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${(error as Error).message}`);
        process.exit(1);
    }
}