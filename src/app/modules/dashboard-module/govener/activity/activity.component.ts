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
import { ToastrService } from 'ngx-toastr';
import { SearchParam } from 'src/app/models/SearchParam/search-param';

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
  activityList: Activity[] = [];
  proofDocList: ProofDoc[] = [];
  doccCodeList: any[] = [];
  searchParamModel = new SearchParam();
  requestModel = new Request();
  activityInfo = new Activity();

  addNewActivityForm!: FormGroup;
  updateActivityForm!: FormGroup;

  constructor(private pointTemplateService: PointTemplateService, private mainCategoryService: MainCategoryService
    , private firstCategoryService: FirstSubCategoryService
    , private secondSubCategoryservice: SecondSubCategoryService
    , private docService: ProofDocumentsService
    , private activityService: ActivityService
    , private formBuilder: FormBuilder
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initCreatenewActivityForm();
    this.initUpdateActivcityForm();
    this.getMainActivityCategoryList();
    this.getFirstActivityCategoryList();
    this.getSecondActivityCategoryList();
    this.getProofDocList();
    this.getAllTemplateList();
    this.loadAllActivityList();
  }

  onClickDeleteActivity(activityCode: string) {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.activityCode = activityCode;

    this.activityService.deleteActivityByCode(this.searchParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.toastr.success("Delete Activity", "Activity Deletion Successfuly");
        location.reload();
      }
    })
  }

  onSubmitUpdateActivityForm() {

  }

  onLoadActivityInfo(activityCode: string) {
    this.activityInfo.token = sessionStorage.getItem("authToken");
    this.activityInfo.flag = sessionStorage.getItem("role");
    this.activityInfo.activityCode = activityCode;

    this.activityService.getActivityInfoByCode(this.activityInfo).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp))

      if (resp.code === 1) {
        this.updateActivityForm.controls['code'].setValue(dataList.data[0].activityCode);
        this.updateActivityForm.controls['mainCatCode'].setValue(dataList.data[0].mainCatCode);
        this.updateActivityForm.controls['firstCatCode'].setValue(dataList.data[0].firstCatCode);
        this.updateActivityForm.controls['secondCatCode'].setValue(dataList.data[0].secondCatCode);
        this.updateActivityForm.controls['authUserCode'].setValue(dataList.data[0].authorizedUser);
        this.updateActivityForm.controls['activityName'].setValue(dataList.data[0].activityName);
      }
    })
  }

  loadAllActivityList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.activityService.getActivityList(this.requestModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachActivity: Activity) => {
          this.activityList.push(eachActivity);
        })
      }
    })
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
        this.toastr.success("Add Activity", "Activity Added Successfully");
        location.reload();
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

  initUpdateActivcityForm() {
    this.updateActivityForm = this.formBuilder.group({
      code: ['', Validators.required],
      activityName: ['', Validators.required],
      mainCatCode: ['', Validators.required],
      firstCatCode: ['', Validators.required],
      secondCatCode: ['', Validators.required],
      authUserCode: ['', Validators.required],
      templateCode: ['', Validators.required],
      documentCode: ['' ,Validators.required]
    })

    this.updateActivityForm.controls['code'].disable;
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
