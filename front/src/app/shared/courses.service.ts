import { Injectable } from "@angular/core";
import { Course } from "../models/course.model";
import { forkJoin, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { initialCourses } from "./data";
import { environment } from "../../environments/environment";

@Injectable( {
	providedIn: "root"
} )

export class CoursesService
{
	private HttpOptions = {
		headers: new HttpHeaders( {
			"Content-Type": "application/json"
		} )
	};

	courses: Course[] = [];

	constructor( private http: HttpClient ) { }

	url = environment.production ? "https://assignments-gzwx.onrender.com/api/courses" : "http://localhost:8010/api/courses";

	getCourses( page: number, limit: number ): Observable<any>
	{
		return this.http.get<any>( this.url + "?page=" + page + "&limit=" + limit );
	}

	getCourse( id: number ): Observable<Course>
	{
		return this.http.get<Course>( this.url + "/" + id );
	}

	addCourse( course: Course ): Observable<any>
	{
		return this.http.post<Course>( this.url, course, this.HttpOptions );
	}

	updateCourse( course: Course ): Observable<any>
	{
		return this.http.put<Course>( this.url, course );
	}

	deleteCourse( course: Course ): Observable<any>
	{
		return this.http.delete( this.url + "/" + course._id );
	}

	peuplerBDAvecForkJoin(): Observable<any>
	{
		var appelsVersAddCourse: any = [];

		initialCourses.forEach( ( a ) =>
		{
			var newCourse: any = new Course();
			newCourse.id = a.id;
			newCourse.nom = a.nom;
			newCourse.teacherName = a.teacherName;
			newCourse.teacherAvatar = a.teacherAvatar;

			appelsVersAddCourse.push( this.addCourse( newCourse ) );
		} );

		return forkJoin( appelsVersAddCourse );
	}
}