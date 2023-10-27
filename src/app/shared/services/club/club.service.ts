import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Club } from 'src/app/models/Club/club';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private http: HttpClient) { }

  addNewClub(clubModel: Club) {
    const path = environment.apiRoot + "addClub";
    return this.http.post(path, clubModel);
  }

  getClubList(clubModel: Club) {
    const path = environment.apiRoot + "get-club-list";
    return this.http.post(path, clubModel);
  }

  getClubListByContextUserCode(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "club-list-by-context-user";
    return this.http.post(path, searchParamModel);
  }

  getClubInfoByCode(searchjParamMode: SearchParam) {
    const path = environment.apiRoot + "get-club-info-by-code";
    return this.http.post(path, searchjParamMode);
  }

  updateClubByCode(clubModel: Club) {
    const path = environment.apiRoot + "update-club-by-code";
    return this.http.post(path, clubModel);
  }
}
