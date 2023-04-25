const Chat = require('./app/Chat')

module.exports = function(app, io) {

    const chat = new Chat(io)
    io.on('connection', (socket) => {
        chat.onConnection(socket)
    })
}