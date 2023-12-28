import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from 'src/app/models/Report/report';
import { Request } from 'src/app/models/Request/request';
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

  getClubReportData(reportDataModel: Report) {
    const path = environment.apiRoot + "get-club-report-data";
    return this.http.post(path, reportDataModel);
  }

  exportActivityReport(requestParamModel: Request): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any other headers if needed
    });
    const path = environment.apiRoot + "export-activity-report";
    return this.http.post(path, requestParamModel, {headers: headers,
      responseType: 'blob' as 'json', // This is important to get a binary response
    });
  }

  exportClubReport(requestParamModel: Request) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any other headers if needed
    });
    const path = environment.apiRoot + "export-club-report";
    return this.http.post(path, requestParamModel, {headers: headers,
      responseType: 'blob' as 'json', // This is important to get a binary response
    });
  }
}
