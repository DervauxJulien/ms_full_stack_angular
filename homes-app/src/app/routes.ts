import { Routes } from '@angular/router';

import { ConnectionComponent } from './components/intervention-request/formulaire1/connection/connection.component';
import { DescriptionComponent } from './components/intervention-request/formulaire2/description/description.component';
import { ValidateComponent } from './components/intervention-request/validation/validate/validate.component';
import { InterventionDisplayComponent } from './components/intervention-request/intervention-display/intervention-display.component';
// import { TableComponent } from './components/dashboard/table/table.component';
import { authGuard } from './auth.guard';

const routeConfig: Routes = [
  { path: '', component: ConnectionComponent },
  { path: 'description',component: DescriptionComponent },
  { path: 'validate/:id', component: ValidateComponent },
  { path: 'intervention/:id', component: InterventionDisplayComponent },
  { path: 'intervention', component: InterventionDisplayComponent },
  // { path: 'dashboard/:id',component: TableComponent,
    //  canActivate: [authGuard],
    //  },
];

export default routeConfig;