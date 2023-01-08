var mongoose = require( "mongoose" );
var aggregatePaginate = require( "mongoose-aggregate-paginate-v2" );
var Schema = mongoose.Schema;
var CourseSchema = Schema( {
	id: Number,
	nom: String,
	profNom: String,
	teacherAvatar: String
} );

CourseSchema.plugin( aggregatePaginate );
module.exports = mongoose.model( "Course", CourseSchema );