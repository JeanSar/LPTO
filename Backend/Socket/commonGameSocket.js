module.exports = function(socket,io,ID,players) {
    socket.on('get-my-player',() => {
        socket.emit('my-player',players[ID.RoomKey][socket.id])
    })

    socket.on('move-right',() => {
        players[ID.RoomKey][socket.id].posX += 2;
        players[ID.RoomKey][socket.id].anim = 'right';
        if(players[ID.RoomKey][socket.id].posX > 740){
            players[ID.RoomKey][socket.id].posX = 740;
        }
        io.to(ID.RoomKey).emit('all-position',players[ID.RoomKey])
    })
    socket.on('move-left',() => {
        players[ID.RoomKey][socket.id].posX -= 2;
        players[ID.RoomKey][socket.id].anim = 'left';
        if(players[ID.RoomKey][socket.id].posX < 40){
            players[ID.RoomKey][socket.id].posX = 40;
        }
        io.to(ID.RoomKey).emit('all-position',players[ID.RoomKey])
    })
    socket.on('move-up',() => {
        players[ID.RoomKey][socket.id].posY -= 2;
        if(players[ID.RoomKey][socket.id].posY < 40){
            players[ID.RoomKey][socket.id].posY = 40;
        }
        io.to(ID.RoomKey).emit('all-position',players[ID.RoomKey])
    })
    socket.on('move-down',() => {
        players[ID.RoomKey][socket.id].posY += 2;
        if(players[ID.RoomKey][socket.id].posY > 560){
            players[ID.RoomKey][socket.id].posY = 560;
        }
        io.to(ID.RoomKey).emit('all-position',players[ID.RoomKey])
    })

    socket.on('all-player',() => {
        io.to(ID.RoomKey).emit('all-player',players[ID.RoomKey])
    })
}