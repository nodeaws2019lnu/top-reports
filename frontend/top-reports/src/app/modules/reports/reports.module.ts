import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsListComponent } from './components/reports-list/reports-list.component';
import { MatCardModule } from '@angular/material';

@NgModule({
  declarations: [
    ReportsListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    ReportsListComponent
  ]
})
export class ReportsModule { }
