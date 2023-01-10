var bcrypt = require("bcryptjs");
var UserSchema = require("../model/users");
var UserSchema = require("../model/users");

function checkCredentials(request, result) {
	var email = request.body.mail;
	var password = request.body.mot_de_passe;

	if (!email || !password) {
		return result.status(400).send({ auth: false, message: "invalide" });
	}

	UserSchema.findOne({ email: email }, (dbError, dbData) => {
		if (dbError) {
			throw dbError;
		}
		else if (dbData) {
			console.log(password, dbData, dbData.password);
			bcrypt.compare(password, dbData.password, function (cryptError, cryptMatch) {
				if (cryptError) {
					throw cryptError;
				}
				else if (!cryptMatch) {
					throw cryptMatch;
				}
				else {
					return result.status(200).send({ auth: true, admin: dbData.admin });
				}
			});
		}
		else {
			return result.status(404).send({ auth: false, message: "introuvable" });
		}
	});
}

module.exports = { checkCredentials };