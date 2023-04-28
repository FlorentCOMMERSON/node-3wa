const ent = require('ent')

const User = require('./User')
const Channel = require('./Channel')

class Chat {
    constructor(io) {
        this.io = io
        this.channels = []
        this.channels.push(
            new Channel(io, 'general'),
            new Channel(io, 'movies'),
            new Channel(io, 'gaming')
        )
    }

    onConnection(socket) {
        console.log('Client', socket.id, 'is connected via WebSockets')
        
        socket.once('user:nickname', (nickname) => {
            // Création du nouvel utilisateur
            const user = new User(socket, nickname)
            
            let defaultChannel = this.getChannelByTitle('general')
            defaultChannel.addUser(user)
            socket.emit('init', {
                channelsList: this.getChannelList(),
                userChannelId: user.channelId 
            })

            // Mise en place d'écouteurs d'évènements sur ce socket
            socket.on('message:new', (message) =>this._onNewMessage(user, message))
            socket.on('disconnect', () => this._onUserDisconnect(user))
            socket.on('notify:typing', () => this._onNotifyTyping(user))
            socket.on('channel:change', (channelId) => this._onChangeChannel(user, channelId))
        })
    }

    _onNewMessage(user, message){
        const userChannel = this.getChannelById(user.channelId)
        userChannel.addMessage(user, message)
    }

    _onUserDisconnect(user){
        let userChannel = this.getChannelById(user.channelId)
        userChannel.removeUser(user)
        user.destroy();
    }

    _onNotifyTyping(user){
        user.socket.broadcast.to(user.channelId).emit('notify:typing', user.nickname)
    }

    _onChangeChannel(user, channelId){
        const oldChannel = this.getChannelById(user.chanelId)
        const newChannel = this.getChannelById(channelId)

        if(!(oldChannel instanceof Channel) || !(newChannel instanceof Channel)){
            return console.warn(`_onChangeChannel : Channel(s) invalide(s)`)
        }

        if (newChannel.users.includes(user)){
            return console.warn(`_onChangeChannel : L'utilisateur ${user.nickname} se trouve déjà dans le channel ${newChannel.title}`)
        }

        oldChannel.removeUser(user)
        newChannel.addUser(user)
    }

    getChannelList() {
        return this.channels.map(channel => ({
            id: channel.id,
            title: channel.title
        }))
    }

    getChannelByTitle(title){
        return this.channels.find(channel => channel.title === title)
    }

    getChannelById(id){
        return this.channels.find(channel => channel.id === id)
    }

}

module.exports = Chat
