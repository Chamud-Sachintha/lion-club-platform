import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainCategory } from 'src/app/models/MainCategory/main-category';
import { Request } from 'src/app/models/Request/request';
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
}
