var mongoose = require( "mongoose" );
var aggregatePaginate = require( "mongoose-aggregate-paginate-v2" );
var Schema = mongoose.Schema;
var UserSchema = Schema( {
	mail: String,
	mot_de_passe: String,
	admin: Boolean,
}, {
	timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
} );

UserSchema.plugin( aggregatePaginate );
module.exports = mongoose.model( "User", UserSchema );