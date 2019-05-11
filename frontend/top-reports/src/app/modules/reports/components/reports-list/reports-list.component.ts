import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { Report } from '../../models/report';
import { MatDialog } from '@angular/material';
import { ReportComponent } from '../report/report.component';

@Component({
  selector: 'reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent implements OnInit {

  reports: Report[];

  constructor(
    private reportsService: ReportsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.reportsService.get().subscribe((reports: Report[]) => {
      this.reports = reports;
    });
  }

  addReport() {
    this.openAddEditDialog({} as Report);
  }

  editReport(report: Report) {
    this.openAddEditDialog({... report});
  }

  openAddEditDialog(report: Report) {
    const dialogRef = this.dialog.open(ReportComponent, {
      data: report
    });

    dialogRef.afterClosed().subscribe(this.updateReport);
  }

  updateReport = (report: Report) => {
    if (!report) {
      return;
    }

    const existingIndex = this.reports.findIndex(r => r.id === report.id);
    if (existingIndex !== -1) {
      this.reports[existingIndex] = report;
    } else {
      this.reports = [report, ...this.reports];
    }
  }

  deleteReport(id: number) {
    this.reportsService.delete(id).subscribe(() => {
      this.reports = this.reports.filter(r => r.id !== id);
    });
  }
}
