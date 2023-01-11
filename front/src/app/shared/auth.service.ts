import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { environment } from "../../environments/environment"

@Injectable({
	providedIn: "root"
})

export class AuthService {
	private HttpOptions = {
		headers: new HttpHeaders({
			"Content-Type": "application/json"
		})
	};

	isLogged = false;
	isAdmin = false;

	constructor(private http: HttpClient) { }

	logIn(email: any, password: string) {
		return new Promise((resolve, _reject) => {
			this.http.post<any>(environment.production ? "https://assignments-gzwx.onrender.com/api/auth/login" : "http://localhost:8010/api/auth/login", { mail: email, mot_de_passe: password }, this.HttpOptions)
				.subscribe({
					next: (httpData) => {
						if (httpData.auth === true) {
							this.isLogged = true
							this.isAdmin = httpData.admin
						}

						resolve(httpData)
					}
				})
		})
	}

	logOut() {
		this.isLogged = false
		this.isAdmin = false
	}
}