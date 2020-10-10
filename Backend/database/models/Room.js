const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    _ownerId : {
        type : mongoose.Types.ObjectId,
        required: true
    },
    _usersID : [{
        userID : { type : mongoose.Types.ObjectId }
    }],
    full : {
        type : Boolean
    },
    key : {
        type : String
    },
    public : {
        type : Boolean
    }
});

function makeKey(){
    var result = "";
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for(i=0;i<=6;i++){
        result += chars.charAt(Math.floor(Math.random() * 26));
    }
    return result;
}

RoomSchema.pre('save', function preSaveCallback(next) {
    var _this = this;
    if(_this.key != null){
        next();
    }else{
        _this.key = makeKey();
        while(
            !(Room.findOne({ 'key' : _this.key}, function(err,room){
                if(room === null){
                    return false;
                    
                }else{
                    if (_this.id == room._id){
                        return false;
                    }
                    return true;
                }
            })
        )){
            _this.key = makeKey();
        }
    }
    next();
});
    

const Room = mongoose.model('Room', RoomSchema);
module.exports = Room;