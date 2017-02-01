var mongoose = require("mongoose"),
    autoIncrement = require("mongoose-auto-increment");
var connection = mongoose.connect("mongodb://YelpFav:test1234@ds139619.mlab.com:39619/yelpfav");
var mongoSchema = mongoose.Schema;

autoIncrement.initialize(connection);
var accountSchema = new mongoSchema({
    accountID: Number,
    email: String,
    favourites:[]
});

accountSchema.plugin(autoIncrement.plugin, "accountID");
var accounts = mongoose.model("account",accountSchema);
module.exports = {accounts:accounts}
