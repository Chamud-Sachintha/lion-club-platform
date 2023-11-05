import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getGovernerDashboardData(searchParam: SearchParam) {
    const path = environment.apiRoot + "get-gov-dashboard-data";
    return this.http.post(path, searchParam);
  }

  getClubUserDashboardData(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "get-club-user-dashboard-data";
    return this.http.post(path, searchParamModel);
  }

  getContextUserDashboardData(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "get-context-user-dashboard-data";
    return this.http.post(path, searchParamModel);
  }

  getEvaluvatorDashboardData(searchParam: SearchParam) {
    const path = environment.apiRoot + "get-evaluvator-dashboard-data";
    return this.http.post(path, searchParam);
  }

  getUserInfo(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "get-user-info-dashboard";
    return this.http.post(path, searchParamModel);
  }

  getGovnerDashboardTableData(searchParam: SearchParam) {
    const path = environment.apiRoot + "get-gov-dashboard-table";
    return this.http.post(path, searchParam);
  }
}
