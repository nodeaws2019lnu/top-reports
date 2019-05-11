import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Report } from '../models/report';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  // MOCKED
  public get() : Observable<Report[]> {
    const data: Report[] = [
      { 
        id: 1,
        name: 'Users count', 
        isRepeated: false,
        command: 
`SELECT 
  COUNT(1) AS [Count] 
FROM [dbo].[Users]`
      },
      { 
        id: 2, 
        name: 'Names and emails', 
        isRepeated: true, 
        repeatSchedule: '0 0 * ? * *',
        command: 
`SELECT 
  [Name],
  [Email]
FROM [dbo.Users]`, 
      }
    ];

    return of(data);
  }
  
  // MOCKED
  public edit(report: Report) : Observable<Report> {
    if (!report || !report.id) {
      console.error('invalid report to update');
      throw 'invalid report to update';
    }

    const data: Report = { ...report };
    return of(data);
  }
  
  // MOCKED
  public add(report: Report) : Observable<Report> {
    if (!report) {
      console.error('invalid report to add');
      throw 'invalid report to add';
    }

    const data: Report = { ...report };
    data.id = Math.round(Math.random() * 1000000);
    return of(data);
  }
  
  // MOCKED
  public delete(id: number) : Observable<any> {
    return of({});
  }
}
