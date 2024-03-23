const { WebSocketServer } = require('ws');
const uuid = require('uuid');
const url = require('url');

function setupWebSocketServer(httpServer) {
    const wss = new WebSocketServer({ noServer: true });

    httpServer.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
            console.log('upgraded to a Web Socket')
        });
    });

    const connections = {}; // Map of UUIDs to WebSocket connections

    // When a user establishes a WebSocket connection
    wss.on('connection', (ws, request) => {
        // Parse the URL from the request
        const parsedUrl = url.parse(request.url, true);
        // Extract the userID from the query parameters
        const userId = parsedUrl.query.userID;
        const connectionId = uuid.v4(); // Generate UUID for the connection
        connections[connectionId] = { userId, ws, alive: true }; // Associate UUID with user ID and WebSocket connection
        console.log(connections[connectionId]);
        
        ws.on('message', function message(data) {
            console.log(data);
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

module.exports = { setupWebSocketServer };
