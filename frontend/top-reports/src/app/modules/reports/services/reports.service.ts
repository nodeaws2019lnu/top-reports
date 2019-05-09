import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ReportListItem } from '../models/report-list-item';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  // MOCKED
  public getReports() : Observable<ReportListItem[]> {
    const data: ReportListItem[] = [
      { id: 1, name: 'Report 1' },
      { id: 2, name: 'Report 2' }
    ];

    return of(data);
  }
}
