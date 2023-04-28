const shortid = require ('shortid')
const ent = require('ent')

class Channel {
    constructor(io, title){
        this.id = shortid.generate() //génère un short ID unique pour ce channel
        this.io = io
        this.title = title // nom du channel
        this.users = [] // liste des users --- Chaque channel gère sa propre liste
        this.messages = [] // Chaque channel a sa liste de message
    }

    addUser(user){
        user.socket.join(this.id)
        user.channelId = this.id
        this.users.push(user)
        this.io.to(this.id).emit('user:list', this.getUsernamesList())
        user.socket.emit('message:list', this.messages.slice(-20))
    }

    removeUser(user){
        let index = this.users.indexOf(user)
        if (index > -1) {
            user.socket.leave(this.id)
            this.users.splice(index, 1)

            this.io.to(this.id).emit('user:list', this.getUsernamesList()) 
        }
    }

    addMessage(user, message){
        message = ent.encode(message);

        const newMessageObj = { 
            nickname: user.nickname,
            message,
        }

        this.messages.push(newMessageObj)

        this.io.to(this.id).emit('message:new', newMessageObj)
    }

    getUsernamesList(){
        return this.users.map(user => user.nickname)
    }

    destroy(){}
}

module.exports = Channel