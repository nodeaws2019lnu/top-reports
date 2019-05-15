import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Report } from '../models/report';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  public get() : Observable<Report[]> {
    return this.http.get<Report[]>('reports/');

    // MOCKED
    const data: Report[] = [
      { 
        id: 1,
        name: 'Users count', 
        startDate: new Date(2019, 5, 15, 0, 0, 0).toISOString(),
        periodMode: 'd',
        execTime: '13-30-00',
        query: 
`SELECT 
  COUNT(1) AS [Count] 
FROM [dbo].[Users]`
      },
      { 
        id: 2, 
        name: 'Names and emails', 
        startDate: new Date(2019, 5, 16, 0, 0, 0).toISOString(),
        periodMode: 'o',
        execTime: '04-20-00',
        query: 
`SELECT 
  [Name],
  [Email]
FROM [dbo.Users]`, 
      }
    ];

    return of(data);
  }
  
  public edit(report: Report) : Observable<Report> {
    if (!report || !report.id) {
      console.error('invalid report to update');
      throw 'invalid report to update';
    }
    
    return this.http.put<Report>('reports/', report);

    // MOCKED
    const data: Report = { ...report };
    return of(data);
  }
  
  public add(report: Report) : Observable<Report> {
    if (!report) {
      console.error('invalid report to add');
      throw 'invalid report to add';
    }

    return this.http.post<Report>('reports/', report);
    
    // MOCKED
    const data: Report = { ...report };
    data.id = Math.round(Math.random() * 1000000);
    return of(data);
  }
  
  // MOCKED
  public delete(id: number) : Observable<any> {
    return this.http.delete('reports/' + id);

    // MOCKED
    return of({});
  }
}
