import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Club } from 'src/app/models/Club/club';
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
}
