import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsListComponent } from './components/reports-list/reports-list.component';
import { MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule } from '@angular/material';
import { ReportComponent } from './components/report/report.component';
import { FormsModule } from '@angular/forms';
import { ReportHistoryComponent } from './components/report-history/report-history.component';

@NgModule({
  declarations: [
    ReportsListComponent,
    ReportComponent,
    ReportHistoryComponent
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
