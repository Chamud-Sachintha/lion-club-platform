import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from 'src/app/models/Request/request';
import { Zone } from 'src/app/models/Zone/zone';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(private http: HttpClient) { }

  createNewZone(zoneInfoModel: Zone) {
    const path = environment.apiRoot + "addZone";
    return this.http.post(path, zoneInfoModel);
  }

  getZoneList(requestModel: Request) {
    const path = environment.apiRoot + "get_zone-list";
    return this.http.post(path, requestModel);
  }
}
