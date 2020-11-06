const User = require('./database/models/User');
const Room = require('./database/models/Room');
const DBfonctions = require("./database/DBfonctions");
const mongoose = require("./database/mongoose");
const DBTools = new DBfonctions();
module.exports =  { User, Room, mongoose, DBTools };
const app = require("./app");
const http = require('http').createServer(app);
const socket = require("./Socket/mainSocket")(http);

http.listen(6920, () => {console.log('Server Connected on port 6920');DBTools.resetDatabase(Room,User)});
