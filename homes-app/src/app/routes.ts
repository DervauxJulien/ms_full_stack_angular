import { Routes } from '@angular/router';
import { InterventionFirstRequestComponent } from './intervention-first-request/intervention-first-request.component';
import { InterventionSecondRequestComponent } from './intervention-second-request/intervention-second-request.component';
import { InterventionThirdRequestComponent } from './intervention-third-request/intervention-third-request.component';

const routeConfig: Routes = [
  { path: '', component: InterventionFirstRequestComponent },
  { path: 'description', component: InterventionSecondRequestComponent },
  { path: 'validate/:id', component: InterventionThirdRequestComponent },
];

export default routeConfig;