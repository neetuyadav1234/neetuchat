const express = require('express');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const User = require('./app/model/userModel'); // Assuming User model is defined here
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
app.use(cors()); // Apply CORS middleware
app.options('*', cors()); // Enable pre-flight across all routes
const port = 3900;

const server = http.createServer(app);
const io = socketio(server, { cors: { origin: '*' } });

// Assuming 'key' is your JWT secret key, store it securely (e.g., environment variables)
const secretKey = process.env.JWT_SECRET_KEY || 'your_jwt_secret_key_here'; // Replace with actual secret

io.on('connection', (socket) => {
    console.log('>>>>> Socket connected:', socket.id);

    if (socket.handshake.headers && socket.handshake.headers.authorization) {
        const token = socket.handshake.headers.authorization;
        jwt.verify(token, "secrete key", (err, decoded) => {
            if (err) {
                console.error('JWT verification failed:', err.message);
                // Handle error gracefully, e.g., emit an error event to client
                socket.emit('error', { message: 'Invalid authentication token' });
                return;
            }

            const userId = decoded.id;
            socket.decoded = decoded;
            console.log('User is connected:', userId);

            socket.on('updateuserprofile', async (data) => {
                try {

                    const updatedUser = await User.findByIdAndUpdate(userId, data)

                    // Additional validation (optional)
                    if (!updatedUser) {
                        throw new Error('User profile update failed');
                    }

                    // Emit success response
                    socket.emit('updated user', { success: true, data: updatedUser });
                } catch (error) {
                    console.error('Error updating user profile:', error.message);
                    // Emit error response
                    socket.emit('error', { message: 'Failed to update user profile' });
                }
            });



            // Handle socket disconnection
            socket.on('disconnect', () => {
                console.log('User disconnected:', userId);
            });
        });
    } else {
        console.log('Missing or invalid authorization header');
        // Handle missing authorization gracefully, e.g., emit an error event to client
        socket.emit('error', { message: 'Missing authorization header' });
    }
});

server.listen(port, () => {
    db.dbConnection()
    console.log(`Socket server is running on port ${port}`);
});
