import { Component, Input, OnInit } from "@angular/core";
import { Assignment } from "../../models/assignment.model";
import { AssignmentsService } from "src/app/shared/assignments.service";
import { CoursesService } from "src/app/shared/courses.service";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/auth.service";
import { Course } from "../../models/course.model";

@Component({
	selector: "app-assignment-detail",
	templateUrl: "./assignment-detail.component.html",
	styleUrls: ["./assignment-detail.component.css"]
})

export class AssignmentDetailComponent implements OnInit {
	@Input() assignmentTransmis?: Assignment;
	isLogged = this.authService.isLogged;
	isAdmin = this.authService.isAdmin;
	courseName = "";
	profNom = "";
	profImage = "";

	constructor(
		private assignmentsService: AssignmentsService,
		private coursesService: CoursesService,
		private authService: AuthService,
		private router: Router
	) { }

	ngOnInit(): void {
		if (!this.assignmentTransmis) return;
		this.coursesService.getCourses()
			.subscribe(data => {
				data.docs = data.docs.filter((course: Course) => course.id === this.assignmentTransmis?.course)[0];
				this.courseName = data.docs.nom;
				this.profNom = data.docs.profNom;
				this.profImage = data.docs.profImage;
			});
	}

	onAssignmentRendu() {
		if (!this.assignmentTransmis || !this.assignmentTransmis.note || !this.authService.isLogged) return;

		this.assignmentTransmis.rendu = true;
		this.assignmentsService.updateAssignment(this.assignmentTransmis)
			.subscribe(() => {
				this.router.navigate(["/home"]);
			});
	}

	onDelete() {
		if (!this.assignmentTransmis || !this.authService.isAdmin) return;

		this.assignmentsService.deleteAssignment(this.assignmentTransmis)
			.subscribe(() => {
				this.router.navigateByUrl("/", { skipLocationChange: true }).then(() =>
					this.router.navigate(["/home"])
				);
			});

		this.assignmentTransmis = undefined;
	}

	onClickEdit() {
		if (!this.assignmentTransmis || !this.authService.isAdmin) return;
		this.router.navigate(["/assignment", this.assignmentTransmis.id, "edit"], {
			queryParams: {
				nom: this.assignmentTransmis.nom
			}, fragment: "edition"
		});
	}
}