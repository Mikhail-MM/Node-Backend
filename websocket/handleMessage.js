const { socketSwitchBoard } = require('./switchboard');
const { createMessage } = require('../api/models/messages');

const handleMessage = async (message) => {
  try {
    const parsedMessage = JSON.parse(message);
    const { type, user_id, email } = parsedMessage;
    console.log("Parsed message");
    console.log(parsedMessage);
    console.log(type);
    switch(type) {
      case 'messages/createMessage': {
        const { message, chatroom_id } = parsedMessage;
        const ws = socketSwitchBoard.get(user_id);
        const { created_at, id } = await createMessage({ message, chatroom_id, user_id });
        ws.send(
          JSON.stringify({
            type: 'notification',
            message: 'Your message was successful.'
          })
        );
        socketSwitchBoard.forEach((ws, user_id) => {
          // TODO: Handle Per-Room Messages
          ws.send(
            JSON.stringify({
              type: 'messages/createMessage',
              id,
              message,
              created_by: email, 
              created_at,
            })
          )
        });

        return;
      }
      default: {
        throw new Error("Un-Identified Action Type.");
      }
    }
  } catch(err) {
    throw err;
  }
}

module.exports = { handleMessage } 