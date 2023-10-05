import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Region } from 'src/app/models/Region/region';
import { Request } from 'src/app/models/Request/request';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(private http: HttpClient) { }

  createNewRegion(regionModel: Region) {
    const path = environment.apiRoot + "addRegion";
    return this.http.post(path, regionModel);
  }

  getRegionList(requestModel: Request) {
    const path = environment.apiRoot + "get-region-list";
    return this.http.post(path, requestModel);
  }
}
