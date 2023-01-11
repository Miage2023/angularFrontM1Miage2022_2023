import { OnInit, ViewChild, Component } from "@angular/core"
import { MatPaginator } from "@angular/material/paginator"
import { MatSort } from "@angular/material/sort"
import { MatTableDataSource } from "@angular/material/table"
import { AuthService } from "../shared/auth.service"
import { AssignmentsService } from "../shared/assignments.service"
import { CoursesService } from "src/app/shared/courses.service"
import { Assignment } from "../models/assignment.model"
import { Course } from "../models/course.model"

@Component({
	selector: "app-assignments",
	templateUrl: "./assignments.component.html",
	styleUrls: ["./assignments.component.css"]
})

export class AssignmentsComponent implements OnInit {
	@ViewChild(MatPaginator)
	paginator!: MatPaginator

	@ViewChild(MatSort)
	sort!: MatSort
	nomDevoir = "";
	remarque = "";
	note = 0;
	rendu = false;
	course = 0;
	dataSource!: MatTableDataSource<Assignment>
	displayedColumns: string[] = ["id", "name", "author", "course", "date", "remarque", "note", "rendu"];
	selection!: Assignment | undefined
	formVisible = false;
	page: number = 1;
	limit: number = 10000;
	totalDocs!: number
	totalPages!: number
	hasPrevPage!: boolean
	prevPage!: number
	hasNextPage!: boolean
	nextPage!: number
	courses!: string[]
	assignments!: Assignment[]
	clickedRows = new Set<Assignment>();
	isLogged = this.authService.isLogged;
	isAdmin = this.authService.isAdmin;

	constructor(
		private authService: AuthService,
		private coursesService: CoursesService,
		private assignmentsService: AssignmentsService
	) { }

	ngOnInit(): void {
		this.coursesService.getCourses().subscribe(courses => {
			this.courses = courses.docs.map((course: Course) => {
				return course.nom
			})
			this.assignmentsService.getAssignments(this.page, this.limit)
				.subscribe(assignments => {
					this.assignments = assignments.docs
					this.page = assignments.page
					this.limit = assignments.limit
					this.totalDocs = assignments.totalDocs
					this.totalPages = assignments.totalPages
					this.hasPrevPage = assignments.hasPrevPage
					this.prevPage = assignments.prevPage
					this.hasNextPage = assignments.hasNextPage
					this.nextPage = assignments.nextPage

					this.assignments = this.assignments.map((assignment: Assignment) => {
						assignment._course = this.courses[assignment.course as number - 1]
						return assignment
					})

					this.dataSource = new MatTableDataSource(this.assignments)
					this.dataSource.sort = this.sort
					this.dataSource.paginator = this.paginator
				})
		})
	}

	assignmentClique(assignment: Assignment) {
		if (this.selection === assignment) {
			this.selection = undefined
		}
		else {
			this.selection = assignment
		}
	}

	onAddAssignmentBtnClick() {
		this.formVisible = true
	}

	onNouvelAssignment() {
		this.formVisible = false
	}
}