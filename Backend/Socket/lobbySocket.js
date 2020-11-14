module.exports = function(socket,io,ID,name,players) {
        const serverTools = require('../server');
        
        socket.on('ID',(data) => {
            ID = data;
            socket.join(ID.RoomKey);
            io.to(ID.RoomKey).emit('User join');
            
            serverTools.DBTools.getUsernameFromBacktoBack(ID.UserId,(username) => {name = username;
                { if(players[ID.RoomKey] == undefined){
                    players[ID.RoomKey] = {};
                }
                players[ID.RoomKey][socket.id] = {
                    name : username,
                    posX : Math.floor(Math.random() * 800),
                    posY : Math.floor(Math.random() * 600),
                    anim : ""
                }}
            },serverTools.Room,serverTools.User,serverTools.mongoose);
            const commonGame = require('./commonGameSocket')(socket,io,ID,players);
            const lptSocket = require('./lptSocket')(socket,io,ID,players,serverTools);
        });

        socket.on('disconnect', ()=> {
            console.log('user disconnected');
            serverTools.DBTools.leave_room_forced(ID,serverTools.Room,serverTools.User,serverTools.mongoose);
            io.to(ID.RoomKey).emit('User left');
            io.to(ID.RoomKey).emit('new-message',`${name} left the room`);
            delete players[ID.RoomKey][socket.id]
            io.to(ID.RoomKey).emit('all-player',players[ID.RoomKey])
            
        });
        
        socket.on('Fdisconnect', () => {
            delete players[ID.RoomKey][socket.id]
            socket.disconnect();
            io.to(ID.RoomKey).emit('all-player',players[ID.RoomKey])
        });
        socket.on('new-message',(message) => {
            io.to(ID.RoomKey).emit('new-message',message);
        });
}