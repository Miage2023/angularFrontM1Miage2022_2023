import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./shared/auth.service";
import { AssignmentsService } from "./shared/assignments.service";
import { CoursesService } from "./shared/courses.service";
import { environment } from "../environments/environment";

@Component( {
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: [ "./app.component.css" ]
} )

export class AppComponent
{
	title = "Application de gestion des devoirs à rendre";
	email = "";
	password = "";
	validator = new FormControl( "", [ Validators.required, Validators.email ] );
	hide = true;
	isLogged = this.authService.isLogged;
	isAdmin = this.authService.isAdmin;
	loginVisible = false;

	constructor(
		private authService: AuthService,
		private router: Router,
		private assignmentsService: AssignmentsService,
		private coursesService: CoursesService
	) { }

	ngOnInit(): void {}

	async login()
	{
		if ( !this.email || !this.password ) { return; }
		await this.authService.logIn( this.email, this.password );
		if ( this.authService.isLogged )
		{
			this.loginVisible = false;
			this.isLogged = this.authService.isLogged;
			this.isAdmin = this.authService.isAdmin;
			this.router.navigateByUrl( "/", { skipLocationChange: true } ).then( () =>
				this.router.navigate( [ "/home" ] )
			);
		}
		else
		{
			alert( "Erreur " );
		}

		this.email = "";
		this.password = "";
	}

	logout()
	{
		this.isLogged = false;
		this.isAdmin = false;
		this.authService.logOut();
		this.router.navigateByUrl( "/", { skipLocationChange: true } ).then( () =>
			this.router.navigate( [ "/home" ] )
		);
	}
	showLogin()
	{
		this.loginVisible = true;
	}
	getErrorMessage()
	{
		if ( this.validator?.hasError( "required" ) )
		{
			return "Vous devez entrer une valeur";
		}

		return this.validator?.hasError( "email" ) ? "Email pas valide" : "";
	}

	initialiserLaBaseAvecDonneesDeTest()
	{
		this.coursesService.peuplerBDAvecForkJoin().subscribe( () =>
		{
			this.assignmentsService.peuplerBDAvecForkJoin();
		} );
	}
}