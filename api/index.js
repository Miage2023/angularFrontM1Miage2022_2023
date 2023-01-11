var express = require("express")
var app = express()
var cors = require("cors")
var bodyParser = require("body-parser")

var mongoose = require("mongoose")
mongoose.Promise = global.Promise

var uri = "mongodb+srv://miageadmin:MasterMiage123@cluster0.eab7zrr.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri)

app.use(cors({
	origin: "*",
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var users = require("./routes/users")
var courses = require("./routes/courses")
var assignments = require("./routes/assignments")
var prefix = "/api"

app.route(prefix + "/assignments")
	.get(assignments.getAssignments)
	.post(assignments.addAssignment)
	.put(assignments.updateAssignment)
	.delete(assignments.deleteAssignment)

app.route(prefix + "/assignments/:id")
	.get(assignments.getAssignment)
	.delete(assignments.deleteAssignment)

app.route(prefix + "/courses")
	.get(courses.getCourses)
	.post(courses.addCourse)

app.route(prefix + "/courses/:id").get(courses.getCourse)

app.route(prefix + "/auth/login")
	.post(users.checkCredentials)

var port = process.env.PORT || 8010

app.listen(port, "0.0.0.0")

module.exports = app