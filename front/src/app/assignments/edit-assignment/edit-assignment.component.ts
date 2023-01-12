import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { FormBuilder, Validators } from "@angular/forms"
import { AssignmentsService } from "src/app/shared/assignments.service"
import { CoursesService } from "src/app/shared/courses.service"
import { Assignment } from "../../models/devoir.model"
import { Course } from "../../models/matiere.model"

@Component({
	selector: "app-edit-assignment",
	templateUrl: "./edit-assignment.component.html",
	styleUrls: ["./edit-assignment.component.css"],
})

export class EditAssignmentComponent implements OnInit {
	assignment!: Assignment | undefined
	noteAssignment!: number
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
	fourthFormGroup = this._formBuilder.group({
		fourthCtrl: ["", Validators.required],
	});
	fifthFormGroup = this._formBuilder.group({
		fifthCtrl: ["", Validators.required],
	});

	isLinear = true;

	constructor(
		private _formBuilder: FormBuilder,
		private assignmentsService: AssignmentsService,
		private coursesService: CoursesService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit(): void {
		this.assignmentsService.getAssignment(+this.route.snapshot.params["id"]).subscribe((assignment) => {
			if (!assignment) return
			this.assignment = assignment
			this.firstFormGroup.setValue({ firstCtrl: assignment.nom })
			this.secondFormGroup.setValue({ secondCtrl: assignment.course.toString() })
			this.thirdFormGroup.setValue({ thirdCtrl: assignment.dateDeRendu.toString() })
			this.fourthFormGroup.setValue({ fourthCtrl: assignment.note.toString() })
			this.fifthFormGroup.setValue({ fifthCtrl: assignment.remarque })
			this.onChange(assignment.course as number)
		})

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

	onSaveAssignment() {
		if (!this.assignment || !this.firstFormGroup.value.firstCtrl || !this.secondFormGroup.value.secondCtrl || !this.thirdFormGroup.value.thirdCtrl || !this.fourthFormGroup.value.fourthCtrl || !this.fifthFormGroup.value.fifthCtrl) {
			return
		}
		this.assignment.nom = this.firstFormGroup.value.firstCtrl
		this.assignment.course = +this.secondFormGroup.value.secondCtrl
		this.assignment.dateDeRendu = new Date(this.thirdFormGroup.value.thirdCtrl)
		this.assignment.note = Math.min(Math.max(+this.fourthFormGroup.value.fourthCtrl, 0), 20)
		this.assignment.remarque = this.fifthFormGroup.value.fifthCtrl
		this.assignment.rendu = true
		this.assignmentsService
			.updateAssignment(this.assignment)
			.subscribe(() => {
				this.router.navigate(["/home"])
			})
	}
}