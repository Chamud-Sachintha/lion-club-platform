import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Activity } from 'src/app/models/Activity/activity';
import { FirstSubCategory } from 'src/app/models/FirstSubCategory/first-sub-category';
import { MainCategory } from 'src/app/models/MainCategory/main-category';
import { PointTemplate } from 'src/app/models/PointTemplate/point-template';
import { ProofDoc } from 'src/app/models/ProofDoc/proof-doc';
import { Request } from 'src/app/models/Request/request';
import { SecondSubCategory } from 'src/app/models/SecondSubCategory/second-sub-category';
import { ActivityService } from 'src/app/shared/services/activity/activity.service';
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

  templateList: PointTemplate[] = [];
  mainCategoryList: MainCategory[] = [];
  firstSubCategoryList: FirstSubCategory[] = [];
  secondCategoryList: SecondSubCategory[] = [];
  proofDocList: ProofDoc[] = [];
  doccCodeList: any[] = [];
  requestModel = new Request();
  activityInfo = new Activity();

  addNewActivityForm!: FormGroup;

  constructor(private pointTemplateService: PointTemplateService, private mainCategoryService: MainCategoryService
    , private firstCategoryService: FirstSubCategoryService
    , private secondSubCategoryservice: SecondSubCategoryService
    , private docService: ProofDocumentsService
    , private activityService: ActivityService
    , private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initCreatenewActivityForm();
    this.getMainActivityCategoryList();
    this.getFirstActivityCategoryList();
    this.getSecondActivityCategoryList();
    this.getProofDocList();
    this.getAllTemplateList();
  }

  onSubmitCreateNewActivityForm() {
    const activityCode = this.addNewActivityForm.controls['code'].value;
    const activityName = this.addNewActivityForm.controls['activityName'].value;
    const mainCategoryCode = this.addNewActivityForm.controls['mainCatCode'].value;
    const firstCategoryCode = this.addNewActivityForm.controls['firstCatCode'].value;
    const secondCategoryCode = this.addNewActivityForm.controls['secondCatCode'].value;
    const authUserCode = this.addNewActivityForm.controls['authUserCode'].value;
    const templateCode = this.addNewActivityForm.controls['templateCode'].value;
    const documentCode = this.addNewActivityForm.controls['documentCode'].value;

    if (activityCode == "") {

    } else if (activityName == "") {

    } else if (mainCategoryCode == "") {

    } else if (firstCategoryCode == "") {

    } else if (secondCategoryCode == "") {

    } else if (authUserCode == "") {

    } else if (templateCode == "") {

    } else if (documentCode == "") {

    } else {
      this.activityInfo.activityCode = activityCode;
      this.activityInfo.activityName = activityName;
      this.activityInfo.mainCatCode = mainCategoryCode;
      this.activityInfo.firstCatCode = firstCategoryCode;
      this.activityInfo.secondCatCode = secondCategoryCode;
      this.activityInfo.authUserCode = authUserCode;
      this.activityInfo.templateCode = templateCode;
      this.activityInfo.documentCode = documentCode;

      this.activityInfo.token = sessionStorage.getItem("authToken");
      this.activityInfo.flag = sessionStorage.getItem("role");

      this.activityService.addNewActivity(this.activityInfo).subscribe((resp: any) => {
        console.log(resp)
      }, (err) => {})
    }
  }

  initCreatenewActivityForm() {
    this.addNewActivityForm = this.formBuilder.group({
      code: ['', Validators.required],
      activityName: ['', Validators.required],
      mainCatCode: ['', Validators.required],
      firstCatCode: ['', Validators.required],
      secondCatCode: ['', Validators.required],
      authUserCode: ['', Validators.required],
      templateCode: ['', Validators.required],
      documentCode: ['' ,Validators.required]
    })
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
    }, (err) => { })
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
    }, (err) => { })
  }

  getFirstActivityCategoryList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.firstCategoryService.getFirstSubcategoryList(this.requestModel).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      dataList.data[0].forEach((firstCategory: FirstSubCategory) => {
        this.firstSubCategoryList.push(firstCategory);
      })
    }, (err) => { })
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
    }, (err) => { })
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
    }, (err) => { })
  }

  public requestAutocompleteItemsFake = (text: string): Observable<String[]> => {
    console.log(this.proofDocList)
    return of(this.doccCodeList);
  };

  public onSelect(item: any) {
    console.log('tag selected: value is ' + item);
  }

}
