import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FirstSubCategory } from 'src/app/models/FirstSubCategory/first-sub-category';
import { MainCategory } from 'src/app/models/MainCategory/main-category';
import { PointTemplate } from 'src/app/models/PointTemplate/point-template';
import { ProofDoc } from 'src/app/models/ProofDoc/proof-doc';
import { Request } from 'src/app/models/Request/request';
import { SecondSubCategory } from 'src/app/models/SecondSubCategory/second-sub-category';
import { FirstSubCategoryService } from 'src/app/shared/services/first-sub-category/first-sub-category.service';
import { MainCategoryService } from 'src/app/shared/services/main-category/main-category.service';
import { PointTemplateService } from 'src/app/shared/services/point-template/point-template.service';
import { ProofDocumentsService } from 'src/app/shared/services/proof-documents/proof-documents.service';
import { SecondSubCategoryService } from 'src/app/shared/services/second-sub-category/second-sub-category.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  placeHolder = "test";
  items = ['Javascript', 'Typescript'];

  templateList: PointTemplate[] = [];
  mainCategoryList: MainCategory[] = [];
  firstSubCategoryList: FirstSubCategory[] = [];
  secondCategoryList: SecondSubCategory[] = [];
  proofDocList: ProofDoc[] = [];
  doccCodeList: any[] = [];
  requestModel = new Request();

  constructor(private pointTemplateService: PointTemplateService, private mainCategoryService: MainCategoryService
            , private firstCategoryService: FirstSubCategoryService
            , private secondSubCategoryservice: SecondSubCategoryService
            , private docService: ProofDocumentsService) {}

  ngOnInit(): void {
    this.getMainActivityCategoryList();
    this.getFirstActivityCategoryList();
    this.getSecondActivityCategoryList();
    this.getProofDocList();
    this.getAllTemplateList();
  }

  getProofDocList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.docService.getProofDocList(this.requestModel).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachDoc: ProofDoc) => {
          this.proofDocList.push(eachDoc);
          this.doccCodeList.push(eachDoc.documentCode);
        })
      }
    }, (err) => {})
  }

  getSecondActivityCategoryList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.secondSubCategoryservice.getSecondCategoryList(this.requestModel).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((secondCategory: SecondSubCategory) => {
          this.secondCategoryList.push(secondCategory);
        })
      }
    } , (err) => {})
  }

  getFirstActivityCategoryList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.firstCategoryService.getFirstSubcategoryList(this.requestModel).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      dataList.data[0].forEach((firstCategory: FirstSubCategory) => {
        this.firstSubCategoryList.push(firstCategory);
      })
    }, (err) => {})
  }

  getMainActivityCategoryList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.mainCategoryService.getMainCategoryList(this.requestModel).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachMainCategory: MainCategory) => {
          this.mainCategoryList.push(eachMainCategory);
        })
      }
    }, (err) => {})
  }

  getAllTemplateList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.pointTemplateService.getTemplateList(this.requestModel).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachTemplate: PointTemplate) => {
          this.templateList.push(eachTemplate);
        })
      }
    }, (err) => {})
  }

  public requestAutocompleteItemsFake = (text: string): Observable<String[]> => {
    console.log(this.proofDocList)
    return of(this.doccCodeList);
};

  public onSelect(item: any) {
    console.log('tag selected: value is ' + item);
}

}
