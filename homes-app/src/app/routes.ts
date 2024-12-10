import { Routes } from '@angular/router';

import { ConnectionComponent } from './components/intervention-request/formulaire1/connection/connection.component';
import { DescriptionComponent } from './components/intervention-request/formulaire2/description/description.component';
import { ValidateComponent } from './components/intervention-request/validation/validate/validate.component';
import { InterventionDisplayComponent } from './components/intervention-request/intervention-display/intervention-display.component';
import { Login2Component } from './components/login2/login2.component';
import { TableComponent } from './components/dashboard/table/table.component';

const routeConfig: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'request', component : ConnectionComponent},
  { path: 'login', component: Login2Component },
  { path: 'description', component: DescriptionComponent },
  { path: 'dashboard', component: TableComponent },
  { path: 'validate/:id', component: ValidateComponent },
  { path: 'intervention/:id', component: InterventionDisplayComponent },
  { path: 'intervention', component: InterventionDisplayComponent },
];

export default routeConfig;