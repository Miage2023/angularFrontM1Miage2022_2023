import { Injectable } from "@angular/core";
import { Assignment } from "../models/assignment.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { initialAssignments } from "./data";
import { Course } from "../models/course.model";
import { CoursesService } from "./courses.service";
import { environment } from "../../environments/environment";

@Injectable({
	providedIn: "root"
})

export class AssignmentsService {
	private HttpOptions = {
		headers: new HttpHeaders({
			"Content-Type": "application/json"
		})
	};

	assignments: Assignment[] = [];

	constructor(private http: HttpClient, private coursesService: CoursesService) { }

	url = environment.production ? "https://assignments-gzwx.onrender.com/api/assignments" : "http://localhost:8010/api/assignments";

	getAssignments(page: number, limit: number): Observable<any> {
		return this.http.get<any>(this.url + "?page=" + page + "&limit=" + limit);
	}
	getAssignment(id: number): Observable<Assignment | undefined> {
		return this.http.get<Assignment>(this.url + "/" + id);
	}
	addAssignment(assignment: Assignment): Observable<any> {
		return this.http.post<Assignment>(this.url, assignment, this.HttpOptions);
	}
	updateAssignment(assignment: Assignment): Observable<any> {
		return this.http.put<Assignment>(this.url, assignment);
	}
	deleteAssignment(assignment: Assignment): Observable<any> {
		return this.http.delete(this.url + "/" + assignment._id);
	}
	peuplerBDAvecForkJoin(): void {
		initialAssignments.forEach((a) => {
			this.coursesService.getCourse(a.course).subscribe((course: Course) => {
				var newAssignment: any = new Assignment();
				newAssignment.id = a.id;
				newAssignment.nom = a.nom;
				newAssignment.auteur = a.auteur;
				newAssignment.course = course.id;
				newAssignment.dateDeRendu = new Date(a.dateDeRendu);
				newAssignment.remarque = a.remarque;
				newAssignment.note = a.note;
				newAssignment.rendu = a.rendu;

				this.addAssignment(newAssignment).subscribe(() => { });
			});
		});
	}
}