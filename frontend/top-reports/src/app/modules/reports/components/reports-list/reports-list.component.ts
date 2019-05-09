import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { ReportListItem } from '../../models/report-list-item';

@Component({
  selector: 'reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent implements OnInit {

  reports: ReportListItem[];

  constructor(private reportsService: ReportsService) { }

  ngOnInit() {
    this.reportsService.getReports().subscribe((reports: ReportListItem[]) => {
      this.reports = reports;
    });
  }
}
