import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsListComponent } from './modules/reports/components/reports-list/reports-list.component';

const routes: Routes = [
  {
    path: 'reports',
    component: ReportsListComponent
  },
  { 
    path: '',
    redirectTo: '/reports',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
