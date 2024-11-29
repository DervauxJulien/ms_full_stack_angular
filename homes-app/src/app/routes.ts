import { Routes } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { InterventionFirstRequestComponent } from "./intervention-first-request/intervention-first-request.component";

const routeConfig: Routes = [
     {
        path: '',
        component: InterventionFirstRequestComponent,
        title: "Demande d'intervention"
     },
];

export default routeConfig;