const express = require('express');
const app = express();
const http = require('http').createServer(app);

const mongoose = require("./database/mongoose");

const io = require('socket.io')(http);

const User = require('./database/models/User');
const Room = require('./database/models/Room');



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use(express.json());

var players = {};
io.on('connection', (socket) => {
    var ID;
    var name;
    
    
    console.log('a user connected');
    socket.on('disconnect', ()=> {
        console.log('user disconnected');
        leave_room_forced(ID);
        io.to(ID.RoomKey).emit('User left');
        io.to(ID.RoomKey).emit('new-message',`${name} left the room`);
        delete players[ID.RoomKey][socket.id]
        io.to(ID.RoomKey).emit('all-player',players[ID.RoomKey])
        
    });
    socket.on('ID',(data) => {
        ID = data;
        socket.join(ID.RoomKey);
        io.to(ID.RoomKey).emit('User join');
        
        getUsernameFromBacktoBack(ID.UserId,(username) => {name = username;
            { if(players[ID.RoomKey] == undefined){
                players[ID.RoomKey] = {};
            }
            players[ID.RoomKey][socket.id] = {
                name : username,
                posX : Math.floor(Math.random() * 800),
                posY : Math.floor(Math.random() * 600),
                anim : ""
            }}
        });

    });
    socket.on('Fdisconnect', () => {
        delete players[ID.RoomKey][socket.id]
        socket.disconnect();
        io.to(ID.RoomKey).emit('all-player',players[ID.RoomKey])
    });
    socket.on('new-message',(message) => {
        io.to(ID.RoomKey).emit('new-message',message);
    });

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

    /*socket.on('game-1'),(socket) => {
        socket.on('test',() => {
            console.log("oouh ma gaté GATO")
        })
    }*/
    
})


/*
CreateUser,UpdateUser,GetUser,DeleteUser
*/
app.post('/create_account', (req, res, next) => {
    username = req.body.username;
    password = req.body.password;
    User.findOne({'username' : username },
      function(err,usr)
        {
          if(usr === null)
            {
              const newUser = new User({ username: username, password: password, _roomId : null, inRoom : false });
              newUser.save(function (err) {
                if(err){return console.error(err);}
                else{ res.status(201).send(newUser)}
              });
  
            }else{
              res.status(406).json({status: 'already exist'})
            }
        }
    );
});

app.post('/login', (req,res,next) => {
    username = req.body.username;
    password = req.body.password;

    function request(isMatch,usr) {
        if(isMatch){
            res.status(201).send(usr);
        }else{
            res.status(406).json({status : 'wrong password'});
        }
    }

    User.findOne({'username' : username },
        function(err,usr){
            if(usr === null){
                res.status(406).json({status: 'this username not exist'});
            }else{
                usr.comparePassword(password,request);
            }
        });
});

app.post('/username', (req,res,next) =>{
    User.findOne({ _id : req.body.Id }, (err,usr) =>{
        if(usr === null){
            res.status(406).json({status: 'not found'});
        }else{
            res.status(201).json({ "username": usr.username});
        }
    })
})

app.get('/all_publicRoom', (req,res,next) => {
    Room.find({ public: true}, (err,rooms) =>{
        res.status(201).send(rooms);
    }
)});

app.post('/create_room', (req,res,next) => {
    const newRoom = new Room({ _ownerId : mongoose.Types.ObjectId(req.body.Id), full : false, public: req.body.public });
    User.findOne({'_id' : mongoose.Types.ObjectId(req.body.Id) },
        function(err,usr){
            if(usr == null){
                res.status(406).json({status : 'player not exist '});
            }else{
                if(!usr.inRoom){
                    newRoom.save(function (err) {
                        if(err){return console.error(err);}
                        else{
                            console.log(newRoom._Id);
                            User.update( { _id : usr._id }, { _roomId : mongoose.Types.ObjectId(newRoom._id), inRoom : true }, function(err,aff,res){
                            });
                            res.status(201).send(newRoom);
                        }
                    });
                }else{
                    res.status(406).json({status : 'already in room'});
                }
            }
        })
    
});

app.put('/join_room', (req,res,next) => {
    User.findOne({ '_id' : mongoose.Types.ObjectId(req.body.UserId)},
        function(err,usr){
            if(usr == null){
                res.status(406).json({status : 'player not exist' });
            }else{
                Room.findOne({ 'key' : req.body.RoomKey},function(err,room){
                    if(room == null){
                        res.status(406).json({status : 'room not exist'});
                    }else{
                        if(!room.full){
                            if(usr.inRoom){
                                res.status(406).json({status : 'already on a room'});
                                return;
                            }
                            User.update( { _id : usr._id}, { _roomId : mongoose.Types.ObjectId(room._id), inRoom : true }, function(err,aff,res){
                            });
                            if(room._usersID.length < 7){
                                console.log("place vide");
                                
                                room._usersID.push({ '_id' : mongoose.Types.ObjectId(req.body.UserId)});
                                if(room._usersID.length == 7){
                                    room.full = true;
                                }
                                room.save()
                                res.status(201).send(room);
                            }
                            
                        }else{
                            res.status(406).json({status : 'room is full'});
                        }
                    }
                }
                )
            }
        })
})

app.post('/room', (req,res,next) => {
    Room.findOne({ 'key' : req.body.RoomKey}, function(err,room){
        if(room == null){
            res.status(406).json({status : "room not exist"});
        }else{
            res.status(201).send(room);
        }
    })
})

app.delete('/leave_room', (req,res,next) => {
    User.findOne({ '_id' : mongoose.Types.ObjectId(req.body.UserId)},
    function(err,usr){
        if(usr == null){
            res.status(406).json({status : 'player not exist'});
        }else{
            Room.findOne({ 'key' : req.body.RoomKey}, function(err,room){
                if(room == null){
                    res.status(406).json({status : 'room not exist'});
                }else{
                    if(JSON.stringify(room._ownerId) == JSON.stringify(req.body.UserId)){
                        if(room._usersID.length <= 0 ){
                            usr.inRoom = false;
                            usr._roomId = null;
                            usr.save();
                            Room.deleteOne({ 'key' : req.body.RoomKey}, function(err,res){
                                if(err){
                                    console.log("nothing to delete ?");
                                }else{
                                    console.log(res);
                                }
                            });
                            res.status(201).json({ status : "room destroy"});    
                        }else{
                            room._ownerId = room._usersID[0]._id;
                            room._usersID.shift();
                            room.save();
                            usr.inRoom = false;
                            usr._roomId = null;
                        }
                        res.status(201).json({status : "ok"});
                    }else{
                        usr.inRoom = false;
                        usr._roomId = null;
                        for(i=0;i<room._usersID.length;i++){
                            if(JSON.stringify(room._usersID[i]._id) == JSON.stringify(usr._id)){
                                room._usersID.splice(i,1);
                                if(room.full){room.full = false;}
                                room.save();
                                usr.save();
                                res.status(201).send(usr);
                                break;
                            }
                        }         
                    }
                }
            })
        }
    })
})

function leave_room_forced(req)
{
    User.findOne({ '_id' : mongoose.Types.ObjectId(req.UserId)},
    function(err,usr){
        if(usr == null){
            //res.status(406).json({status : 'player not exist'});
            return
        }else{
            Room.findOne({ 'key' : req.RoomKey}, function(err,room){
                if(room == null){
                    //res.status(406).json({status : 'room not exist'});
                    return;
                }else{
                    if(JSON.stringify(room._ownerId) == JSON.stringify(req.UserId)){
                        if(room._usersID.length <= 0 ){
                            usr.inRoom = false;
                            usr._roomId = null;
                            usr.save();
                            Room.deleteOne({ 'key' : req.RoomKey}, function(err,res){
                                if(err){
                                    console.log("nothing to delete ?");
                                }else{
                                    console.log(res);
                                }
                            });
                            return;    
                        }else{
                            room._ownerId = room._usersID[0]._id;
                            room._usersID.shift();
                            room.save();
                            usr.inRoom = false;
                            usr._roomId = null;
                            usr.save();
                            return;
                        }
                    }else{
                        usr.inRoom = false;
                        usr._roomId = null;
                        for(i=0;i<room._usersID.length;i++){
                            if(JSON.stringify(room._usersID[i]._id) == JSON.stringify(usr._id)){
                                room._usersID.splice(i,1);
                                if(room.full){room.full = false;}
                                room.save();
                                usr.save();
                                //res.status(201).send(usr);
                                break;
                            }
                        }         
                    }
                }
            })
        }
    })
}


function getUsernameFromBacktoBack(ID,cb){
    User.findOne({ _id : mongoose.Types.ObjectId(ID) }, (err,usr) =>{
        if(usr === null){
            console.log("user not found")
        }else{
            cb(usr.username);
        }
    })
}

function resetServer(){
    Room.collection.drop().catch((error)=> {if(error.message !== 'ns not found'){
        throw err;
    }});
    User.find({}, (err,users) => {
        if(err){console.log(err);}
        users.map(user => {
            user._roomId = null;
            user.inRoom = false;
            user.save();
        });
    }).catch((error) => {console.log(error)});;
}

http.listen(6920, () => {console.log('Server Connected on port 6920');resetServer()});