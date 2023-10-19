import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PointTemplate } from 'src/app/models/PointTemplate/point-template';
import { Request } from 'src/app/models/Request/request';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PointTemplateService {

  constructor(private http: HttpClient) { }

  addNewPointTemplate(templateInfo: PointTemplate) {
    const path = environment.apiRoot + "add-point-template";
    return this.http.post(path, templateInfo);
  }

  getTemplateList(requestMode: Request) {
    const path = environment.apiRoot + "get-template-list";
    return this.http.post(path, requestMode);
  }

  getTemplateObjByCode(searchParam: SearchParam) {
    const path = environment.apiRoot + "get-template-obj-by-code";
    return this.http.post(path, searchParam);
  }
}
