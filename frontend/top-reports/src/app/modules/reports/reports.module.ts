import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule } from '@angular/material';

import { MaterialTimePickerModule } from '@candidosales/material-time-picker';

import { ReportComponent } from './components/report/report.component';
import { ReportsListComponent } from './components/reports-list/reports-list.component';
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
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MaterialTimePickerModule,
    MatSelectModule
  ],
  exports: [
    ReportsListComponent
  ],
  entryComponents: [
    ReportComponent
  ]
})
export class ReportsModule { }
