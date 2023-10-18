import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from 'src/app/models/Request/request';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { SecondSubCategory } from 'src/app/models/SecondSubCategory/second-sub-category';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SecondSubCategoryService {

  constructor(private http: HttpClient) { }

  addNewSecondSubCategory(secondSubcategory: SecondSubCategory) {
    const path = environment.apiRoot + "add-second-sub-category";
    return this.http.post(path, secondSubcategory);
  }

  getSecondCategoryList(requestModel: Request) {
    const path = environment.apiRoot + "get-second-category-list";
    return this.http.post(path, requestModel);
  }

  getSecondCategoryListByFirstCategoryCode(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "get-secondCatList-by-firstCatCode";
    return this.http.post(path, searchParamModel);
  }
}
