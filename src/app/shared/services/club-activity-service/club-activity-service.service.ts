import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClubActivity } from 'src/app/models/ClubActivity/club-activity';
import { Request } from 'src/app/models/Request/request';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClubActivityServiceService {

  constructor(private http: HttpClient) { }

  submitNewClubActivity(clubActivityModel: FormData) {
    const path = environment.apiRoot + "submit-club-activity";
    return this.http.post(path, clubActivityModel);
  }

  getClubActivityList(searchParam: SearchParam) {
    const path = environment.apiRoot + "get-club-activity-list";
    return this.http.post(path, searchParam);
  }

  getAllClubActivityList(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "club-activity-list";
    return this.http.post(path, searchParamModel);
  }

  getClubActivityDocByCode(searchParam: SearchParam) {
    const path = environment.apiRoot + "get-activity-doc-list-by-code";
    return this.http.post(path, searchParam);
  }

  getClubActivityImagesByCode(searchParam: SearchParam) {
    const path = environment.apiRoot + "get-activity-image-list-by-code";
    return this.http.post(path, searchParam);
  }

  getClubActivityListByClubCode(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "get-club-activity-list-by-club-code";
    return this.http.post(path, searchParamModel);
  }

  getClubSctivityInfoByCode(searchParam: SearchParam) {
    const path = environment.apiRoot + "get-activity-info-by-code";
    return this.http.post(path, searchParam);
  }

  updateClubActivityStatusByEvaluvator(requestModel: Request) {
    const path = environment.apiRoot + "check-club-activity-by-code";
    return this.http.post(path, requestModel);
  }

  getClubActivityListByContextUserCode(searchParam: SearchParam) {
    const path = environment.apiRoot + "get-club-activity-list-by-context-user-code";
    return this.http.post(path, searchParam);
  }
}
