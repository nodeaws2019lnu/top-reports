import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsListComponent } from './components/reports-list/reports-list.component';
import { MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule } from '@angular/material';
import { ReportComponent } from './components/report/report.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReportsListComponent,
    ReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule
  ],
  exports: [
    ReportsListComponent
  ],
  entryComponents: [
    ReportComponent
  ]
})
export class ReportsModule { }
