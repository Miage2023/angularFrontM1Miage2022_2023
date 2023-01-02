var UserSchema = require( "../model/users" );

function checkCredentials( request, result )
{
	var email = request.body.email;
	var password = request.body.password;

	if ( !email || !password )
	{
		return result.status( 400 ).send( { auth: false, message: "Données manquantes ou invalides." } );
	}

	UserSchema.findOne( { email: email }, ( dbError, dbData ) =>
	{
		if ( dbError )
		{
			throw dbError;
		}
		else if ( dbData )
		{
			bcrypt.compare( password, dbData.password, function ( cryptError, cryptMatch )
			{
				if ( cryptError )
				{
					throw cryptError;
				}
				else if ( !cryptMatch )
				{
					throw cryptError;
				}
				else
				{
					return result.status( 200 ).send( { auth: true, admin: dbData.admin } );
				}
			} );
		}
		else
		{
			return result.status( 404 ).send( { auth: false, message: "Utilisateur introuvable." } );
		}
	} );
}

module.exports = { checkJWT, checkCredentials };