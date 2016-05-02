var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    username       : String,
    password       : String,
    name           : String,
    balance        : Number,
    savingsBalance : Number,
    goals : [{
        goalName   : String,
        saved      : Number,
        price      : Number,
        imageURL   : String,
        created    : Boolean
    }],
    history : [{
        date                : String,
        imageURL            : Number,
        eventDescription    : String,
        availableFundsBalance   : Number
    }]
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
