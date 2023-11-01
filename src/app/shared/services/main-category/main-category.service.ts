import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainCategory } from 'src/app/models/MainCategory/main-category';
import { Request } from 'src/app/models/Request/request';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MainCategoryService {

  constructor(private http: HttpClient) { }

  addNewMainCategory(maincategoryModel: MainCategory) {
    const path = environment.apiRoot + "add-main-category";
    return this.http.post(path, maincategoryModel);
  }

  getMainCategoryList(mainCategoryModel: Request) {
    const path = environment.apiRoot + "main-category-list";
    return this.http.post(path, mainCategoryModel);
  }

  getMainCategoryCodeByCode(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "get-main-category-by-code";
    return this.http.post(path, searchParamModel);
  }

  updateMainCategoryByCode(mainCategoryModel: MainCategory) {
    const path = environment.apiRoot + "update-main-category-by-code";
    return this.http.post(path, mainCategoryModel);
  }

  deleteMainCategosyByCode(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "delete-main-cet-by-code";
    return this.http.post(path, searchParamModel);
  }
}
