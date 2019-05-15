import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ReportResult } from '../models/report-result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsHistoryService {

  constructor(private http: HttpClient) { }

  public get(reportId: number) : Observable<ReportResult[]> {
    return this.http.get<ReportResult[]>('reports/' + reportId + '/execs');
  }
  
  public getResult(fileName: string) : Observable<Blob> {
    return this.http.get('reports/download/' + fileName, { responseType: 'blob' });
  }
}
