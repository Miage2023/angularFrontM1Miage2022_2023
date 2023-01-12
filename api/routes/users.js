var bcrypt = require("bcryptjs")
var UserSchema = require("../model/users")
var UserSchema = require("../model/users")

function checkCredentials(request, result) {
	var email = request.body.mail
	var password = request.body.mot_de_passe

	if (!email || !password) {
		return result.status(400).send({ auth: false, message: "invalide" })
	}

	UserSchema.findOne({ email: email }, (error, data) => {
		if (error) {
			throw error
		}
		else if (data) {
			bcrypt.compare(password, data.password, function (error, match) {
				if (error) {
					throw error
				}
				else if (!match) {
					throw match
				}
				else {
					return result.status(200).send({ auth: true, admin: data.admin })
				}
			})
		}
		else {
			return result.status(404).send({ auth: false, message: "introuvable" })
		}
	})
}

module.exports = { checkCredentials }