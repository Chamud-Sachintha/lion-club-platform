import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report } from 'src/app/models/Report/report';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getGovernerReportData(reportDataModel: Report) {
    const path = environment.apiRoot + "gov-reports-data";
    return this.http.post(path, reportDataModel);
  }
}
