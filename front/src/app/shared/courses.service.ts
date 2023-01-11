import { Injectable } from "@angular/core"
import { Course } from "../models/course.model"
import { forkJoin, Observable } from "rxjs"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { initialCourses } from "./data"
import { environment } from "../../environments/environment"

@Injectable({
	providedIn: "root"
})

export class CoursesService {
	private HttpOptions = {
		headers: new HttpHeaders({
			"Content-Type": "application/json"
		})
	};
	courses: Course[] = [];
	constructor(private http: HttpClient) { }
	url = environment.production ? "https://assignments-gzwx.onrender.com/api/courses" : "http://localhost:8010/api/courses";
	getCourses(): Observable<any> {
		return this.http.get<any>(this.url)
	}
	getCourse(id: number): Observable<Course> {
		return this.http.get<Course>(this.url + "/" + id)
	}
	addCourse(course: Course): Observable<any> {
		return this.http.post<Course>(this.url, course, this.HttpOptions)
	}
	updateCourse(course: Course): Observable<any> {
		return this.http.put<Course>(this.url, course)
	}
	deleteCourse(course: Course): Observable<any> {
		return this.http.delete(this.url + "/" + course._id)
	}
}