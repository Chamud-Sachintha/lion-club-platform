import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirstSubCategory } from 'src/app/models/FirstSubCategory/first-sub-category';
import { Request } from 'src/app/models/Request/request';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FirstSubCategoryService {

  constructor(private http: HttpClient) { }

  addFirstSubCategory(firstSubCategoryModel: FirstSubCategory) {
    const path = environment.apiRoot + "add-first-sub-category";
    return this.http.post(path, firstSubCategoryModel);
  }

  getFirstSubcategoryList(requestModel: Request) {
    const path = environment.apiRoot + "get-first-sub-category-list";
    return this.http.post(path, requestModel);
  }
}
