module.exports = function(socket,io,ID,players) {
    socket.on('play' ,() => {
        io.to(ID.RoomKey).emit('play')
    })
}