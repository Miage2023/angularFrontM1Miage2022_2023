var UserSchema = require("../model/users");

function checkCredentials(request, result) {
	var mail = request.body.mail;
	var mot_de_passe = request.body.mot_de_passe;

	if (!mail || !mot_de_passe) {
		return result.status(400).send({ auth: false, message: "Données manquantes ou invalides." });
	}

	UserSchema.findOne({ mail: mail }, (dbError, dbData) => {
		if (dbError) {
			throw dbError;
		}
		else if (dbData) {
			bcrypt.compare(mot_de_passe, dbData.mot_de_passe, function (cryptError, cryptMatch) {
				if (cryptError) {
					throw cryptError;
				}
				else if (!cryptMatch) {
					throw cryptError;
				}
				else {
					return result.status(200).send({ auth: true, admin: dbData.admin });
				}
			});
		}
		else {
			return result.status(404).send({ auth: false, message: "Utilisateur introuvable." });
		}
	});
}

module.exports = { checkCredentials };