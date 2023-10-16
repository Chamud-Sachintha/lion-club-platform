import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClubActivity } from 'src/app/models/ClubActivity/club-activity';
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
}
