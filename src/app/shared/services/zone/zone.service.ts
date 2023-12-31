import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from 'src/app/models/Request/request';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
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

  getZoneListByReCode(zoneModel: Zone) {
    const path = environment.apiRoot + "get-zone-list-by-re-code";
    return this.http.post(path, zoneModel);
  }

  getZoneByZoneCode(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "get-zone-info-by-code";
    return this.http.post(path, searchParamModel);
  }

  updateZoneByCode(zoneMode: Zone) {
    const path = environment.apiRoot + "update-zone-by-code";
    return this.http.post(path, zoneMode);
  }

  deleteZoneService(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "delete_zone_by-code";
    return this.http.post(path, searchParamModel);
  }
}
