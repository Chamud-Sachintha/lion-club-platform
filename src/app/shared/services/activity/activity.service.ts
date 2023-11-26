import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from 'src/app/models/Activity/activity';
import { Request } from 'src/app/models/Request/request';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
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

  getActivityList(requestModel: Request) {
    const path = environment.apiRoot + "get-activity-list";
    return this.http.post(path, requestModel);
  }

  getActivityInfoByCode(activity: Activity) {
    const path = environment.apiRoot + "get-activity-info";
    return this.http.post(path, activity);
  }

  getActivityInfoByCodes(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "get-activities-by-codes";
    return this.http.post(path, searchParamModel);
  }

  updateActivityByCode(activityInfo: Activity) {
    const path = environment.apiRoot + "update-activity-by-activity-code";
    return this.http.post(path, activityInfo);
  }

  deleteActivityByCode(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "delete-activity-by-code";
    return this.http.post(path, searchParamModel);
  }
}
