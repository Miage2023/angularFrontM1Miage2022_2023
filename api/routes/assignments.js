var Assignment = require( "../model/assignments" );

function getAssignments( request, result )
{
	var query = Assignment.aggregate();

	Assignment.aggregatePaginate( query, {
		page: parseInt( request.query.page ) || 1,
		limit: parseInt( request.query.limit ) || 10,
	}, ( dbError, dbData ) =>
	{
		if ( dbError )
		{
			throw dbError;
		}

		return result.send( dbData );
	} );
}

function getAssignment( request, result )
{
	Assignment.findOne( { id: request.params.id }, ( dbError, dbData ) =>
	{
		if ( dbError )
		{
			throw dbError;
		}

		return result.json( dbData );
	} );
}

function addAssignment( request, result )
{
	var assignment = new Assignment();
	assignment.id = request.body.id;
	assignment.nom = request.body.nom;
	assignment.auteur = request.body.auteur;
	assignment.course = request.body.course;
	assignment.dateDeRendu = request.body.dateDeRendu;
	assignment.remarque = request.body.remarque;
	assignment.note = request.body.note;
	assignment.rendu = request.body.rendu;
	assignment.save( ( dbError ) =>
	{
		if ( dbError )
		{
			throw dbError;
		}

		return result.json( { message: `${ assignment.nom } saved!` } );
	} );
}

function updateAssignment( request, result )
{
	Assignment.findByIdAndUpdate( request.body._id, request.body, { new: true }, ( dbError, _dbData ) =>
	{
		if ( dbError )
		{
			throw dbError;
		}

		return result.json( { message: "updated" } );
	} );
}

function deleteAssignment( request, result )
{
	Assignment.findByIdAndRemove( request.params.id, ( dbError, dbData ) =>
	{
		if ( dbError )
		{
			throw dbError;
		}

		return result.json( { message: `${ dbData.nom } deleted` } );
	} );
}

module.exports = { getAssignments, addAssignment, getAssignment, updateAssignment, deleteAssignment };