import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Report } from '../../models/report';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent  {

  constructor(
    private reportsService: ReportsService,
    public dialogRef: MatDialogRef<ReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Report
  ) { }

  onCancelClick() {
    this.dialogRef.close();
  }

  onSaveClicked() {
    if (this.isEdit()) {
      this.reportsService.edit(this.data).subscribe(result => this.dialogRef.close(result));
    } else {
      this.reportsService.add(this.data).subscribe(result => this.dialogRef.close(result));
    }
  }

  isEdit() : boolean {
    return this.data && this.data.id > 0;
  }
}
