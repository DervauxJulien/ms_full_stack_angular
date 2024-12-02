import { Routes } from '@angular/router';
import { InterventionFirstRequestComponent } from './intervention-first-request/intervention-first-request.component';
import { InterventionSecondRequestComponent } from './intervention-second-request/intervention-second-request.component';

const routeConfig: Routes = [
  { path: '', component: InterventionFirstRequestComponent },
  { path: 'description', component: InterventionSecondRequestComponent },
];

export default routeConfig;