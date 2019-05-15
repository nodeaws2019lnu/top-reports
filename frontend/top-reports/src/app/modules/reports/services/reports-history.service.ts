import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ReportResult } from '../models/report-result';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
        key: '1',
        date: '2019-05-15',
        time: '21-23-00',
        fileName: 'abc1'
      },
      { 
        key: '2',
        date: '2019-05-14',
        time: '21-33-00',
        fileName: 'test 123 a'
      }
    ];

    return of(data);
  }
  
  public getResult(fileName: string) : Observable<any> {
    return this.http.get('reports/download/' + fileName, { responseType: 'blob' });

    // MOCKED
    const data = new Blob(['hello there'], { type: 'text/csv' });

    return of(data);
  }
}
