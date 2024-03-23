const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function setupWebSocketServer(httpServer) {
    const wss = new WebSocketServer({ /* configuration options */ });

    httpServer.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    });

    const connections = {}; // Map of UUIDs to WebSocket connections

    // When a user establishes a WebSocket connection
    wss.on('connection', (ws, request) => {
        const userId = getUserIdFromRequest(request); // Get user ID from request (e.g., authenticated user)
        const connectionId = uuid.v4(); // Generate UUID for the connection
        connections[connectionId] = { userId, ws, alive: true }; // Associate UUID with user ID and WebSocket connection

        ws.on('message', function message(data) {
            const userID = data.userID;
            const message = data.message;
            sendMessageToUser(userID, message);
        });

        ws.on('close', () => {
            // Remove the closed connection from the connections map
            delete connections[connectionId];
        });

        ws.on('pong', () => {
            connections[connectionId].alive = true;
        });
    });

    // When you need to send a message to a specific user
    function sendMessageToUser(userId, message) {
        // Find the appropriate connection associated with the user ID
        const connection = Object.values(connections).find(conn => conn.userId === userId);
        if (connection) {
            connection.ws.send(message); // Send the message over the WebSocket connection
        } else {
            console.log(`User ${userId} not found or not connected.`);
        }
    }

    setInterval(() => {
        Object.keys(connections).forEach(key => {
            // Kill any connection that didn't respond to the ping last time
            if (!connections[key].alive) {
                connections[key].ws.terminate();
            } else {
                connections[key].alive = false;
                connections[key].ws.ping();
            }
        });
    }, 10000);

    return wss;
}

module.exports = setupWebSocketServer;
