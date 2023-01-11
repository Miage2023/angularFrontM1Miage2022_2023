var Course = require("../model/courses")

function getCourses(request, result) {
	var query = Course.aggregate()

	Course.aggregatePaginate(query, {
		page: parseInt(request.query.page) || 1,
		limit: parseInt(request.query.limit) || 10,
	}, (dbError, dbData) => {
		if (dbError) {
			throw dbError
		}

		return result.send(dbData)
	})
}

function getCourse(request, result) {
	Course.findOne({ id: request.params.id }, (dbError, dbData) => {
		if (dbError) {
			throw dbError
		}

		return result.json(dbData)
	})
}

function addCourse(request, result) {
	var course = new Course()
	course.id = request.body.id
	course.nom = request.body.nom
	course.profNom = request.body.profNom
	course.profImage = request.body.profImage

	course.save((dbError) => {
		if (dbError) {
			throw dbError
		}

		return result.json({ message: `${course.nom} saved!` })
	})
}

module.exports = { getCourses, getCourse, addCourse }