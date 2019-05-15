import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { ReportsHistoryService } from '../../services/reports-history.service';
import { ReportResult } from '../../models/report-result';

@Component({
  selector: 'report-history',
  templateUrl: './report-history.component.html',
  styleUrls: ['./report-history.component.scss']
})
export class ReportHistoryComponent implements OnInit {

  records: ReportResult[];

  constructor(
    private route: ActivatedRoute,
    private reportsHistoryService: ReportsHistoryService
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.reportsHistoryService.get(Number(params.get('id')))
      )
    ).subscribe((data: ReportResult[]) => {
      this.records = data;
    });
  }

  downloadResult(fileName: string) {
    this.reportsHistoryService.getResult(fileName)
      .subscribe(data => {
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');

        link.href = url;
        link.download = fileName;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }
}
