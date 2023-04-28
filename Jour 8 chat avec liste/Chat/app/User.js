const ent = require('ent')

class User {
    constructor(socket, nickname, channelId) {

        if(typeof nickname !== 'string' || nickname.trim() === ''){
            nickname = `user_${Math.random().toString().slice(-5)}`
        }

        this.id        = socket.id
        this.nickname  = ent.encode(nickname)
        this.socket    = socket
        this.channelId = channelId
    }

    destroy() {
        this.id = null
        this.nickname = null
        this.socket.disconnect()
    }
}

module.exports = User
