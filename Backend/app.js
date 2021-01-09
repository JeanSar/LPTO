const express = require('express');
const app = express();

const serverTools = require('./server')

/* setting Headers */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.json());


/* Create user and login */
app.post('/create_account', (req, res, next) => {
    username = req.body.username;
    password = req.body.password;
    serverTools.User.findOne({'username' : username },
    function(err,usr)
        {
        if(usr === null)
            {
            const newUser = new serverTools.User({ username: username, password: password, _roomId : null, inRoom : false });
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

    serverTools.User.findOne({'username' : username },
        function(err,usr){
            if(usr === null){
                res.status(406).json({status: 'this username not exist'});
            }else{
                usr.comparePassword(password,request);
            }
        });
});

/* get Username by ID */
app.post('/username', (req,res,next) =>{
    serverTools.User.findOne({ _id : req.body.Id }, (err,usr) =>{
        if(usr === null){
            res.status(406).json({status: 'not found'});
        }else{
            res.status(201).json({ "username": usr.username});
        }
    })
})

/* GET all public room */
app.get('/all_publicRoom', (req,res,next) => {
    serverTools.Room.find({ public: true}, (err,rooms) =>{
        res.status(201).send(rooms);
    }
)});

/* Create a new Room */
app.post('/create_room', (req,res,next) => {
    const newRoom = new serverTools.Room({ _ownerId : serverTools.mongoose.Types.ObjectId(req.body.Id), full : false, public: req.body.public });
    serverTools.User.findOne({'_id' : serverTools.mongoose.Types.ObjectId(req.body.Id) },
        function(err,usr){
            if(usr == null){
                res.status(406).json({status : 'player not exist '});
            }else{
                if(!usr.inRoom){
                    newRoom.save(function (err) {
                        if(err){return console.error(err);}
                        else{
                            console.log(newRoom._Id);
                            serverTools.User.update( { _id : usr._id }, { _roomId : serverTools.mongoose.Types.ObjectId(newRoom._id), inRoom : true }, function(err,aff,res){
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

/* Join a Room by roomKey */
app.put('/join_room', (req,res,next) => {
    serverTools.User.findOne({ '_id' : serverTools.mongoose.Types.ObjectId(req.body.UserId)},
        function(err,usr){
            if(usr == null){
                res.status(406).json({status : 'player not exist' });
            }else{
                serverTools.Room.findOne({ 'key' : req.body.RoomKey},function(err,room){
                    if(room == null){
                        res.status(406).json({status : 'room not exist'});
                    }else{
                        if(!room.full){
                            if(usr.inRoom){
                                res.status(406).json({status : 'already on a room'});
                                return;
                            }
                            serverTools.User.update( { _id : usr._id}, { _roomId : serverTools.mongoose.Types.ObjectId(room._id), inRoom : true }, function(err,aff,res){
                            });
                            if(room._usersID.length < 7){
                                console.log("place vide");
                                
                                room._usersID.push({ '_id' : serverTools.mongoose.Types.ObjectId(req.body.UserId)});
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

/* Get room by RoomKey */
app.post('/room', (req,res,next) => {
    serverTools.Room.findOne({ 'key' : req.body.RoomKey}, function(err,room){
        if(room == null){
            res.status(406).json({status : "room not exist"});
        }else{
            res.status(201).send(room);
        }
    })
})

/* Leave room by RoomKey and User ID */
app.delete('/leave_room', (req,res,next) => {
    serverTools.User.findOne({ '_id' : serverTools.mongoose.Types.ObjectId(req.body.UserId)},
    function(err,usr){
        if(usr == null){
            res.status(406).json({status : 'player not exist'});
        }else{
            serverTools.Room.findOne({ 'key' : req.body.RoomKey}, function(err,room){
                if(room == null){
                    res.status(406).json({status : 'room not exist'});
                }else{
                    if(JSON.stringify(room._ownerId) == JSON.stringify(req.body.UserId)){
                        if(room._usersID.length <= 0 ){
                            usr.inRoom = false;
                            usr._roomId = null;
                            usr.save();
                            serverTools.Room.deleteOne({ 'key' : req.body.RoomKey}, function(err,res){
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

/* get user Best scores by Name */
app.post('/myBestScore', (req,res,next) =>{
    serverTools.ScoreBinding.find({ "username" : req.body.username},(err,bestScores) => {
        if(bestScores === null){
            res.status(406).json({ status : 'there is no associated score for this player'});
        }else{
            res.status(201).send(bestScores);
        }
    })
});

/* get all Best scores for every games */
app.get('/allStars', (req,res,next) =>{
    serverTools.ScoreBinding.find({},(err,allScores) => {
        if(allScores === null){
            res.status(406).json({ status : 'there is no scores to send'});
        }else{
            function compare(a,b){
                if(a.score > b.score)
                    return -1;
                if(b.score > a.score)
                    return 1;
                return 0;
            }
            res.status(201).send(allScores.sort(compare));
        }
    })
})



module.exports = app;
