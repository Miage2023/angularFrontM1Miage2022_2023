import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { FormBuilder, Validators } from "@angular/forms"
import { AssignmentsService } from "src/app/shared/assignments.service"
import { CoursesService } from "src/app/shared/courses.service"
import { Assignment } from "../../models/devoir.model"
import { Course } from "../../models/matiere.model"

@Component({
	selector: "app-add-assignment",
	templateUrl: "./add-assignment.component.html",
	styleUrls: ["./add-assignment.component.css"]
})

export class AddAssignmentComponent implements OnInit {
	teacher: string = "";
	image!: string
	courses: Course[] = [];
	firstFormGroup = this._formBuilder.group({
		firstCtrl: ["", Validators.required],
	});
	secondFormGroup = this._formBuilder.group({
		secondCtrl: ["", Validators.required],
	});
	thirdFormGroup = this._formBuilder.group({
		thirdCtrl: ["", Validators.required],
	});

	isLinear = true;

	constructor(
		private _formBuilder: FormBuilder,
		private router: Router,
		private assignmentsService: AssignmentsService,
		private coursesService: CoursesService
	) { }

	ngOnInit() {
		this.coursesService.getCourses()
			.subscribe(data => {
				this.courses = data.docs
			})
	}

	onChange(id: number) {
		this.coursesService.getCourse(id)
			.subscribe(data => {
				this.teacher = data.profNom
				this.image = data.image
			})
	}

	onSubmit() {
		if (!this.firstFormGroup.value.firstCtrl || !this.secondFormGroup.value.secondCtrl || !this.thirdFormGroup.value.thirdCtrl) {
			return
		}
		var newAssignment = new Assignment()
		newAssignment.id = Math.floor(Math.random() * 10000)
		newAssignment.nom = this.firstFormGroup.value.firstCtrl
		newAssignment.course = +this.secondFormGroup.value.secondCtrl
		newAssignment.dateDeRendu = new Date(this.thirdFormGroup.value.thirdCtrl)
		newAssignment.rendu = false
		this.assignmentsService.addAssignment(newAssignment).subscribe(() => { })
		this.router.navigateByUrl("/", { skipLocationChange: true }).then(() =>
			this.router.navigate(["/home"])
		)
	}
}