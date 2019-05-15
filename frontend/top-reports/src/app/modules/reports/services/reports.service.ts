import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Report } from '../models/report';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  public get() : Observable<Report[]> {
    return this.http.get<Report[]>('reports/');
  }
  
  public edit(report: Report) : Observable<Report> {
    if (!report || !report.id) {
      console.error('invalid report to update');
      throw 'invalid report to update';
    }
    
    return this.http.put<Report>('reports/', report);
  }
  
  public add(report: Report) : Observable<Report> {
    if (!report) {
      console.error('invalid report to add');
      throw 'invalid report to add';
    }

    return this.http.post<Report>('reports/', report);
  }
  
  // MOCKED
  public delete(id: number) : Observable<any> {
    return this.http.delete('reports/' + id);
  }
}
