import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ReportResult } from '../models/report-result';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsHistoryService {

  constructor(private http: HttpClient) { }

  public get(reportId: number) : Observable<ReportResult[]> {
    return this.http.get<ReportResult[]>('reports/' + reportId + '/execs');

    // MOCKED
    const data: ReportResult[] = [
      { 
        id: 1,
        timeFinished: new Date()
      },
      { 
        id: 2,
        timeFinished: new Date()
      }
    ];

    return of(data);
  }
  
  public getResult(id: number) : Observable<Blob> {
    // MOCKED
    const data = new Blob(['hello there'], { type: 'text/csv' });

    return of(data);
  }
}
