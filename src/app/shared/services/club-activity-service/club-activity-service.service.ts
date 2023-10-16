import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClubActivity } from 'src/app/models/ClubActivity/club-activity';
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
}
