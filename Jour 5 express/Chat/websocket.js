const ent = require('ent')

module.exports = function(app, io) {

    io.on('connection', (socket) => {
        console.log('Client', socket.id, 'is connected via WebSockets')

        socket.on('message:new', ({nickname, message}) => {
            // Sécurisation du message et du nickname
            message = ent.encode(message);
            nickname = ent.encode(nickname);

            io.sockets.emit('message:new', {message, nickname})
        })
    })

}