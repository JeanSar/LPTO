class DbFonctions {
    constructor(){}

    /* delete one player from a room */
    leave_room_forced(req,Room,User,mongoose)
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

        /* get username by ID */
        getUsernameFromBacktoBack(ID,cb,Room,User,mongoose){
            User.findOne({ _id : mongoose.Types.ObjectId(ID) }, (err,usr) =>{
                if(usr === null){
                    console.log("user not found")
                }else{
                    cb(usr.username);
                }
            })
        }

        /* Delete all room and set players to not room state */
        resetDatabase(Room,User){
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

        closeRoom(Room,RoomKey) {
            Room.findOne({ key: RoomKey}, (err,room) => {
                if(room === null){
                    console.log("Room not found")
                }else{
                    room.full = true;
                    room.save();
                }
            })
        }

        openRoom(Room,RoomKey) {
            Room.findOne({ key: RoomKey}, (err,room) => {
                if(room === null){
                    console.log("Room not found");
                }else{
                    room.full = false;
                    room.save();
                }
            })
        }

        saveIfBestScore(ScoreBinding,gamename,username,score){
            ScoreBinding.findOne( {username : username,game : gamename},(err,scoreBinding) => {
                if(scoreBinding === null){
                    const newScoreBinding = new ScoreBinding({ username : username, game : gamename, score : score});
                    newScoreBinding.save();
                }else{
                    if(scoreBinding.score < score){
                        scoreBinding.score = score;
                        scoreBinding.save();
                    }
                }
            })
        }

        saveIfBestScoreForAll(ScoreBinding,gamename, scoresANDusernames){
            for(let i=0; i< scoresANDusernames.length;i++){
                this.saveIfBestScore(ScoreBinding,gamename,scoresANDusernames[i].name,scoresANDusernames[i].score);
            }
        }
}

module.exports = DbFonctions