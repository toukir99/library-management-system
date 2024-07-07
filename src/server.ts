import databaseConnection from './config/config';
import dotenv from 'dotenv';
import express from "express";
import http from 'http';

dotenv.config();

const app = express();
databaseConnection();

const server = http.createServer(app);
const port= process.env.SERVER_PORT || 3001;

server.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
})

