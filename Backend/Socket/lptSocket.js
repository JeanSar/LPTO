module.exports = function(socket,io,ID,players) {
    scores = [];
    socket.on('play' ,() => {
        io.to(ID.RoomKey).emit('play')
    })
    socket.on('end',(score,nbUsers,owner) => {
        console.log("test2");
        scores.push(score);
        if (owner == true) {
            console.log("owner");
            if (scores.length == nbUsers + 1) {
                io.to(ID.RoomKey).emit('scores',scores);
                console.log("oué oué oué");
            }
        }
        else {
            console.log("user");
            if (scores.length == nbUsers + 2) {
                io.to(ID.RoomKey).emit('scores',scores);
                console.log("oué oué oué");
            }
        }
    })
    
}