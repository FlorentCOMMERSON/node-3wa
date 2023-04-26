class Channel {
    constructor(io, title){
        this.io = io
        this.title = title // nom du channel
        this.users = [] // liste des users --- Chaque channel gère sa propre liste
    }

    addMessage(user, room, message){}
    
    pushUser(user){}

    removeUser(user){}

    getUsersList(){}

    destroy(){}
}

module.exports = Channel