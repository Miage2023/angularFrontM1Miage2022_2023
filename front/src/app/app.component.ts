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
	// Titre du composant.
	title = "Application de gestion des devoirs à rendre";

	// Propriétés de l'email et du mot de passe.
	email = "";
	password = "";
	validator = new FormControl( "", [ Validators.required, Validators.email ] );

	// Bouton pour montrer/cache le mot de passe.
	hide = true;

	// État de connexion.
	isLogged = this.authService.isLogged;

	// L'utilisateur est-il un administrateur ?
	isAdmin = this.authService.isAdmin;

	// Afficher ou cacher le formulaire.
	loginVisible = false;

	// varructeur.
	varructor(
		private http: HttpClient,
		private authService: AuthService,
		private router: Router,
		private assignmentsService: AssignmentsService,
		private coursesService: CoursesService
	) { }

	// Méthode d'initialisation.
	ngOnInit(): void
	{ }

	// Méthode pour se connecter.
	async login()
	{
		// Vérification de la présence d'un email/password
		if ( !this.email || !this.password ) { return; }

		// Appel du service d'authentification
		await this.authService.logIn( this.email, this.password );

		// Vérifie si l'utilisateur a été authentifié.
		if ( this.authService.isLogged )
		{
			// Le formulaire de connexion est caché.
			this.loginVisible = false;

			// L'utilisateur est connecté.
			this.isLogged = this.authService.isLogged;

			// Détermine si c'est un administrateur grâce au service d'authentification.
			this.isAdmin = this.authService.isAdmin;

			// Redirection vers la page d'accueil.
			this.router.navigateByUrl( "/", { skipLocationChange: true } ).then( () =>
				this.router.navigate( [ "/home" ] )
			);
		}
		else
		{
			alert( "Email ou mot de passe incorrect" );
		}

		// Réinitialisation du formulaire
		this.email = "";
		this.password = "";
	}

	// Méthode pour se déconnecter.
	logout()
	{
		// Utilisateur/administrateur déconnecté.
		this.isLogged = false;
		this.isAdmin = false;

		// Déconnexion du service d'authentification.
		this.authService.logOut();

		// Redirection vers la page d'accueil.
		this.router.navigateByUrl( "/", { skipLocationChange: true } ).then( () =>
			this.router.navigate( [ "/home" ] )
		);
	}

	// Méthode pour afficher le formulaire de connexion.
	showLogin()
	{
		// Formulaire de connexion visible.
		this.loginVisible = true;
	}

	// Méthode pour afficher les messages d'erreur.
	getErrorMessage()
	{
		if ( this.validator?.hasError( "required" ) )
		{
			return "Vous devez entrer une valeur";
		}

		return this.validator?.hasError( "email" ) ? "Ce n'est pas une adresse email valide" : "";
	}

	// Méthode pour insérer des données de test dans la base de données.
	initialiserLaBaseAvecDonneesDeTest()
	{
		this.coursesService.peuplerBDAvecForkJoin().subscribe( () =>
		{
			this.assignmentsService.peuplerBDAvecForkJoin();
		} );
	}
}