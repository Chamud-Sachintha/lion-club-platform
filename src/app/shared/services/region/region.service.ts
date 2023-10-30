import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Region } from 'src/app/models/Region/region';
import { Request } from 'src/app/models/Request/request';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
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

  getRegionListByUserCode(requestModel: Region) {
    const path = environment.apiRoot + "get-region-list-by-usercode";
    return this.http.post(path, requestModel);
  }

  getRegionInfoByReCode(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "get-region-info-by-code";
    return this.http.post(path, searchParamModel);
  }

  updateRegionVyCode(regionModel: Region) {
    const path = environment.apiRoot + "update-region-by-code";
    return this.http.post(path, regionModel);
  }

  deleteRegionByCode(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "delete-region-by-code";
    return this.http.post(path, searchParamModel);
  }
}
