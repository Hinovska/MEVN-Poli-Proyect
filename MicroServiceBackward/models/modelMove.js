const  mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const modelMove = new Schema({
    move: {type: String},
    created:{type: Date, default: Date.now}
});


module.exports = mongoose.model('MoveBackwards',modelMove);
