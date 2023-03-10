import { Injectable } from "@angular/core"
import { Assignment } from "../models/devoir.model"
import { Observable } from "rxjs"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { CoursesService } from "./courses.service"
import { environment } from "../../environments/environment"

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

	constructor(private http: HttpClient) { }

	url = environment.production ? "https://assignments-gsyj.onrender.com/api/assignments" : "http://localhost:8010/api/assignments";

	getAssignments(page: number, limit: number, filter: boolean): Observable<any> {
		return this.http.get<any>(this.url + "?page=" + page + "&limit=" + limit + "&filter=" + filter)
	}
	getAssignment(id: number): Observable<Assignment | undefined> {
		return this.http.get<Assignment>(this.url + "/" + id)
	}
	addAssignment(assignment: Assignment): Observable<any> {
		return this.http.post<Assignment>(this.url, assignment, this.HttpOptions)
	}
	updateAssignment(assignment: Assignment): Observable<any> {
		return this.http.put<Assignment>(this.url, assignment)
	}
	deleteAssignment(assignment: Assignment): Observable<any> {
		return this.http.delete(this.url + "/" + assignment._id)
	}
}