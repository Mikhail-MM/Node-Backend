const { sessionParser } = require('../middleware/sessionParser');

const { socketSwitchBoard } = require('./switchboard');
const { handleMessage } = require('./handleMessage');

const initializeSocket = (server, wss) => {
  server.on('upgrade', (req, socket, head) => {
    console.log("HTTP Upgrade Request Detected");
    console.log("Parsing Express Session");
    sessionParser(req, {}, () => {
      console.log(req.session);
      if (!req.session.user_id) {
        console.log("UNAUTHORIZED SESSION.")
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
      }
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    })
  });

  wss.on('connection', (ws, req) => {
    console.log("WSS Connection Event - Parsing User ID!");
    const { user_id } = req.session;
    console.log("Adding user to switchboard", user_id);
    socketSwitchBoard.set(Number(user_id), ws);
    ws.on('message', async (message) => {
      // can access session properties
      try {
        handleMessage(message);
      } catch(err) {
        ws.send(
          JSON.stringify({
            type: 'error',
            message: err.message
          })
        );
      }
    })
    ws.on('close', () => {
      console.log("User Disconnected, deleting from switchboard:", user_id)
      socketSwitchBoard.delete(user_id);
    });
  });
}

// //
module.exports = { initializeSocket }