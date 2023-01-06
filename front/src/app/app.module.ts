import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MAT_DATE_LOCALE } from "@angular/material/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatStepperModule } from "@angular/material/stepper";
import { AssignmentsComponent } from "./assignments/assignments.component";
import { RenduDirective } from "./shared/rendu.directive";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { AssignmentDetailComponent } from "./assignments/assignment-detail/assignment-detail.component";

import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { AddAssignmentComponent } from "./assignments/add-assignment/add-assignment.component";
import { AuthGuard } from "./shared/auth.guard";

import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { EditAssignmentComponent } from "./assignments/edit-assignment/edit-assignment.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

var routes: Routes = [
	{ path: "", component: AssignmentsComponent },
	{ path: "home", component: AssignmentsComponent },
	{ path: "add", component: AddAssignmentComponent },
	{ path: "assignment/:id", component: AddAssignmentComponent },
	{ path: "assignment/:id/edit", component: EditAssignmentComponent, canActivate: [ AuthGuard ] },
];

@NgModule( {
	declarations: [
		AppComponent,
		AssignmentsComponent,
		RenduDirective,
		AssignmentDetailComponent,
		AddAssignmentComponent,
		EditAssignmentComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatIconModule,
		MatDividerModule,
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
		ReactiveFormsModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatSelectModule,
		MatPaginatorModule,
		MatTableModule,
		MatSortModule,
		MatStepperModule,

		MatToolbarModule,
		MatSidenavModule,
		MatListModule,
		MatCardModule,
		MatCheckboxModule,
		MatSlideToggleModule,

		RouterModule.forRoot( routes ),

		HttpClientModule,
	],
	providers: [
		{ provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
	],
	bootstrap: [ AppComponent ]
} )

export class AppModule { }