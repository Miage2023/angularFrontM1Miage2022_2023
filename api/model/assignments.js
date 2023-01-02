var mongoose = require( "mongoose" );
var aggregatePaginate = require( "mongoose-aggregate-paginate-v2" );

var Schema = mongoose.Schema;
var AssignmentSchema = Schema( {
	id: Number,
	dateDeRendu: Date,
	nom: String,
	auteur: String,
	course: Number,
	remarque: String,
	note: Number,
	rendu: Boolean
} );

AssignmentSchema.plugin( aggregatePaginate );
module.exports = mongoose.model( "Assignment", AssignmentSchema );