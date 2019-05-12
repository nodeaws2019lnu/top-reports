import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsListComponent } from './modules/reports/components/reports-list/reports-list.component';
import { ReportHistoryComponent } from './modules/reports/components/report-history/report-history.component';

const routes: Routes = [
  {
    path: 'reports',
    component: ReportsListComponent
  },
  {
    path: 'reports/:id/history',
    component: ReportHistoryComponent
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
