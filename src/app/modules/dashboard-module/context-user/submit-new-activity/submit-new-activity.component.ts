import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Activity } from 'src/app/models/Activity/activity';
import { Club } from 'src/app/models/Club/club';
import { ClubActivity } from 'src/app/models/ClubActivity/club-activity';
import { FirstSubCategory } from 'src/app/models/FirstSubCategory/first-sub-category';
import { MainCategory } from 'src/app/models/MainCategory/main-category';
import { Request } from 'src/app/models/Request/request';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { SecondSubCategory } from 'src/app/models/SecondSubCategory/second-sub-category';
import { ActivityService } from 'src/app/shared/services/activity/activity.service';
import { ClubActivityServiceService } from 'src/app/shared/services/club-activity-service/club-activity-service.service';
import { ClubService } from 'src/app/shared/services/club/club.service';
import { FirstSubCategoryService } from 'src/app/shared/services/first-sub-category/first-sub-category.service';
import { MainCategoryService } from 'src/app/shared/services/main-category/main-category.service';
import { SecondSubCategoryService } from 'src/app/shared/services/second-sub-category/second-sub-category.service';
import { ToastrService } from 'ngx-toastr';
import { ValueList } from 'src/app/models/ValueList/value-list';
import { PointTemplateService } from 'src/app/shared/services/point-template/point-template.service';

@Component({
  selector: 'app-submit-new-activity',
  templateUrl: './submit-new-activity.component.html',
  styleUrls: ['./submit-new-activity.component.css'],
})
export class SubmitNewActivityComponent implements OnInit {
  requestModel = new Request();
  activityList: Activity[] = [];
  activityInfo = new Activity();
  submitActivityForm!: FormGroup;
  clubActivityModel = new ClubActivity();
  searchParamModel = new SearchParam();
  firstCategoryList: FirstSubCategory[] = [];
  mainCategoryList: MainCategory[] = [];
  secondCategoryList: SecondSubCategory[] = [];
  clubList: ClubActivity[] = [];
  valueList!: FormArray;
  isDocListHave = false;
  documentAddState = 0;
  selectedFiles: File[] = [];
  clubCode!: any;
  token!: any;
  firstCatgoryCode!: string;
  mainCategoryCode!: string;
  templateValueList: ValueList[] = [];
  clubActivityList: ClubActivity[] = [];
  pointTemplateObjModel = new SearchParam();
  selectedImageFiles: File[] = [];
  userCode!: any;

  constructor(private formBuilder: FormBuilder, private activityService: ActivityService, private clubActivityService: ClubActivityServiceService
            , private firstCategoryService: FirstSubCategoryService
            , private mainCategoryService: MainCategoryService
            , private secondCategoryService: SecondSubCategoryService
            , private pointTemplateService: PointTemplateService
            , private toastr: ToastrService
            , private clubService: ClubService) {}

  ngOnInit(): void {
    this.initSubmitActivityForm();
    this.getMainActivityCategoryList();
    this.getClubActivityList();
    this.loadClubListByContextUserCode();
  }

  loadClubListByContextUserCode() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");

    this.clubService.getClubListByContextUserCode(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachClub: ClubActivity) => {
          this.clubList.push(eachClub);
        })
      }
    })
  }

  getClubActivityList() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");

    this.clubActivityService.getClubActivityListByContextUserCode(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp))

      if (resp.code === 1) {
        dataList.data[0].forEach((eachActivity: ClubActivity) => {
          const date = parseInt(eachActivity.createTime) * 1000;
          eachActivity.createTime = date.toString();

          this.clubActivityList.push(eachActivity)
        })
      }
    })
  }

  onChangeActivity(activityCode: any) {
    this.activityInfo.token = sessionStorage.getItem("authToken");
    this.activityInfo.flag = sessionStorage.getItem("role");
    this.activityInfo.activityCode = activityCode;

    this.activityService.getActivityInfoByCode(this.activityInfo).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp))

      if (resp.code === 1) {
        const pointTemplateCode = dataList.data[0].pointTemplateCode;

        this.pointTemplateObjModel.token = sessionStorage.getItem("authToken");
        this.pointTemplateObjModel.flag = sessionStorage.getItem("role");
        this.pointTemplateObjModel.pointTemplateCode = pointTemplateCode;

        this.pointTemplateService.getTemplateObjByCode(this.pointTemplateObjModel).subscribe((info: any) => {

          const valueList = JSON.parse(JSON.stringify(info));

          if (info.code === 1) {
            valueList.data[0].forEach((eachValue: ValueList) => {
              this.templateValueList.push(eachValue)
            })
          }
        })
      }
    }, (err) => {})
  }

  onChangeSecoondSubCategory(secondCategoryValue: any) {
    this.activityList = [];
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.mainCategoryCode = this.mainCategoryCode;
    this.searchParamModel.firstCategoryCode = this.firstCatgoryCode;
    this.searchParamModel.secondCategoryCode = secondCategoryValue;

    this.activityService.getActivityInfoByCodes(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachActivity: Activity) => {
          this.activityList.push(eachActivity);
        })
      }
    })
  }

  onChangeFirstCategory(firstCategoryCode: any) {
    this.secondCategoryList = [];
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.firstCategoryCode = firstCategoryCode;

    this.firstCatgoryCode = firstCategoryCode;

    this.secondCategoryService.getSecondCategoryListByFirstCategoryCode(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((secondCategory: SecondSubCategory) => {
          this.secondCategoryList.push(secondCategory);
        })
      }
    })
  }

  getMainActivityCategoryList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.mainCategoryService.getMainCategoryList(this.requestModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((mainCategory: MainCategory) => {
          this.mainCategoryList.push(mainCategory)
        })
      }
    })
  }

  onChangeMainActivityCode(mainActivityCode: any) {
    this.firstCategoryList = [];
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.mainCategoryCode = mainActivityCode;

    this.mainCategoryCode = mainActivityCode;

    this.firstCategoryService.getFirstCategoryListByMainCategory(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachCategory: FirstSubCategory) => {
          this.firstCategoryList.push(eachCategory);
        })
      }
    })
  }

  onFileSelected($event: any) {
    this.selectedFiles = Array.from($event.target.files);
    console.log(this.selectedFiles)
  }

  onImageFileSelected($event: any) {
    this.selectedImageFiles = Array.from($event.target.files);
  }

  onSubmitAddClubActivityForm() {
    const activityCode = this.submitActivityForm.controls['activityCode'].value;
    const value = this.selectedImageFiles;
    const conditionType = this.submitActivityForm.controls['conditionType'].value;
    const clubCode = this.submitActivityForm.controls['clubCode'].value;
    const documentValueList = this.selectedFiles;

    if (activityCode == "") {

    } else if (value.length == 0) {

    } else if (conditionType == "") {
      
    } else if (documentValueList.length == 0) {

    } else if (clubCode == "") {

    } else {
      const formData = new FormData();

      this.clubActivityModel.activityCode = activityCode;
      // this.clubCode = sessionStorage.getItem("clubCode");
      // this.clubActivityModel.value = value;
      this.token = sessionStorage.getItem("authToken");
      this.clubActivityModel.flag = sessionStorage.getItem("role");

      formData.append("activityCode", activityCode);
      formData.append("clubCode", clubCode);
      // formData.append("value", value);
      formData.append("token", this.token);
      formData.append("flag", this.clubActivityModel.flag);
      formData.append("type", conditionType);

      this.selectedFiles.forEach((el, index) => {
        formData.append("file" + index, el)
      })

      this.selectedImageFiles.forEach((el, index) => {
        formData.append("image" + index, el);
      })

      this.userCode = sessionStorage.getItem("userCode");

      formData.append("creator", this.userCode);

      this.clubActivityModel.documentList = formData;

      this.clubActivityService.submitNewClubActivity(formData).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.toastr.success("New Club Activity", "New Club Activity Added Successfully");
        }
      }, (err) => {})
    }
  }

  // onChangeActivity(activityCode: any) {
  //   this.activityInfo.token = sessionStorage.getItem("authToken");
  //   this.activityInfo.flag = sessionStorage.getItem("role");
  //   this.activityInfo.activityCode = activityCode;

  //   if (activityCode != "") {
  //     this.activityService.getActivityInfoByCode(this.activityInfo).subscribe((resp: any) => {
  //       const dataList = JSON.parse(JSON.stringify(resp));

  //       if (resp.code === 1) {
  //         this.activityInfo = dataList.data[0];
  //         this.isDocListHave = true;
  //       }
  //     })
  //   }
  // }

  addItem($event: any): void {
    this.valueList = this.submitActivityForm.get('valueList') as FormArray;
    this.valueList.push(this.createValueArrayForm());

    this.documentAddState += 1;
    $event.preventDefault();
  }

  getActivityList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.activityService.getActivityList(this.requestModel).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachActivity: Activity) => {
          this.activityList.push(eachActivity);
        })
      }
    }, (err) => {})
  }

  removeFormControl(index: number) {
    this.valueList.removeAt(index);
    this.documentAddState -= 1;
  }

  initSubmitActivityForm() {
    this.submitActivityForm = this.formBuilder.group({
      activityCode: ['', Validators.required],
      conditionType: ['', Validators.required],
      clubCode: ['', Validators.required],
      valueList: this.formBuilder.array([])
    })
  }

  createValueArrayForm() {
    return this.formBuilder.group({
      'fileValue': ['', Validators.required]
    })
  }
}
