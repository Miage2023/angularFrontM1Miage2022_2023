import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";
import { AuthService } from "./shared/auth.service";
import { AssignmentsService } from "./shared/assignments.service";
import { CoursesService } from "./shared/courses.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})

export class AppComponent {
	mail = "";
	mot_de_passe = "";
	hide = true;
	isLogged = this.authService.isLogged;
	isAdmin = this.authService.isAdmin;
	loginVisible = false;

	constructor(
		private authService: AuthService,
		private router: Router,
	) { }

	ngOnInit(): void { }

	async login() {
		if (!this.mail || !this.mot_de_passe) { return; }
		await this.authService.logIn(this.mail, this.mot_de_passe);
		if (this.authService.isLogged) {
			this.loginVisible = false;
			this.isLogged = this.authService.isLogged;
			this.isAdmin = this.authService.isAdmin;
			this.router.navigateByUrl("/", { skipLocationChange: true }).then(() =>
				this.router.navigate(["/home"])
			);
		}
		else {
			alert("Erreur ");
		}

		this.mail = "";
		this.mot_de_passe = "";
	}

	logout() {
		this.isLogged = false;
		this.isAdmin = false;
		this.authService.logOut();
		this.router.navigateByUrl("/", { skipLocationChange: true }).then(() =>
			this.router.navigate(["/home"])
		);
	}
	showLogin() {
		this.loginVisible = true;
	}
}