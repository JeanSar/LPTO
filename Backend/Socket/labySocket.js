module.exports = function(socket,io,ID,players,serverTools) {
    socket.on('playLab' ,() => {
        lab = require("./algo")();
        io.to(ID.RoomKey).emit('startLab', lab);
    })

}
