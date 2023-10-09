import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from 'src/app/models/Activity/activity';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  addNewActivity(activityInfo: Activity) {
    const path = environment.apiRoot + "add-activity";
    return this.http.post(path, activityInfo);
  }
}
