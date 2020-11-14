const server = require("../server");

module.exports = function(socket,io,ID,players,serverTools) {
    scores = [];
    socket.on('play' ,() => {
        io.to(ID.RoomKey).emit('play')
        serverTools.DBTools.closeRoom(serverTools.Room,ID.RoomKey);
    })
    socket.on('end',(score,nbUsers,owner) => {
        console.log("test2");
        scores.push(score);
        if (owner == true) {
            console.log("owner");
            if (scores.length == nbUsers + 1) {
                io.to(ID.RoomKey).emit('scores',scores);
                console.log("oué oué oué");
                serverTools.DBTools.openRoom(serverTools.Room,ID.RoomKey);
                serverTools.DBTools.saveIfBestScoreForAll(serverTools.ScoreBinding,'LPT',scores);

            }
        }
        else {
            console.log("user");
            if (scores.length == nbUsers + 2) {
                io.to(ID.RoomKey).emit('scores',scores);
                console.log("oué oué oué");
                serverTools.DBTools.openRoom(serverTools.Room,ID.RoomKey);
                serverTools.DBTools.saveIfBestScoreForAll(serverTools.ScoreBinding,'LPT',scores);
            }
        }
    })
    
}