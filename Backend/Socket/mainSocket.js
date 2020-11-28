module.exports = function(http){
    
    const io = require('socket.io')(http);
    io.origins('*:*');
    const serverTools = require('../server');
    let ID;
    let name;
    let players = {};

    io.on('connection', (socket) => {

        const lobby = require('./lobbySocket')(socket,io,ID,name,players);
        
    })
}
