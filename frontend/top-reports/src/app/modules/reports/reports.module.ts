import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsListComponent } from './components/reports-list/reports-list.component';

@NgModule({
  declarations: [
    ReportsListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ReportsListComponent
  ]
})
export class ReportsModule { }
