import http from 'http';
import app from './app';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create an HTTP server 
const server = http.createServer(app);

// Define the port
const port = process.env.SERVER_PORT || 3001;

// Start the server and listen on the specified port
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

