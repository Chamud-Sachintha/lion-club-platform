import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Activity } from 'src/app/models/Activity/activity';
import { ClubActivity } from 'src/app/models/ClubActivity/club-activity';
import { Request } from 'src/app/models/Request/request';
import { ActivityService } from 'src/app/shared/services/activity/activity.service';
import { ClubActivityServiceService } from 'src/app/shared/services/club-activity-service/club-activity-service.service';

@Component({
  selector: 'app-submit-activity',
  templateUrl: './submit-activity.component.html',
  styleUrls: ['./submit-activity.component.css']
})
export class SubmitActivityComponent implements OnInit {

  requestModel = new Request();
  activityList: Activity[] = [];
  activityInfo = new Activity();
  submitActivityForm!: FormGroup;
  clubActivityModel = new ClubActivity();
  valueList!: FormArray;
  isDocListHave = false;
  documentAddState = 0;
  selectedFiles: File[] = [];
  clubCode!: any;
  token!: any;

  constructor(private formBuilder: FormBuilder, private activityService: ActivityService, private clubActivityService: ClubActivityServiceService) {}

  ngOnInit(): void {
    this.initSubmitActivityForm();
    this.getActivityList();
  }

  onFileSelected($event: any) {
    this.selectedFiles = Array.from($event.target.files);
    console.log(this.selectedFiles)
  }

  onSubmitAddClubActivityForm() {
    const activityCode = this.submitActivityForm.controls['activityCode'].value;
    const value = this.submitActivityForm.controls['value'].value;
    const conditionType = this.submitActivityForm.controls['conditionType'].value;
    const documentValueList = this.selectedFiles;

    if (activityCode == "") {

    } else if (value == "") {

    } else if (conditionType == "") {
      
    } else if (documentValueList.length == 0) {
      
    } else {
      const formData = new FormData();

      this.clubActivityModel.activityCode = activityCode;
      this.clubCode = sessionStorage.getItem("clubCode");
      this.clubActivityModel.value = value;
      this.token = sessionStorage.getItem("authToken");
      this.clubActivityModel.flag = sessionStorage.getItem("role");

      formData.append("activityCode", activityCode);
      formData.append("clubCode", this.clubCode);
      formData.append("value", value);
      formData.append("token", this.token);
      formData.append("flag", this.clubActivityModel.flag);

      this.selectedFiles.forEach((el, index) => {
        formData.append("file" + index, el)
      })

      this.clubActivityModel.documentList = formData;

      console.log(this.clubActivityModel)

      this.clubActivityService.submitNewClubActivity(formData).subscribe((resp: any) => {

        if (resp.code === 1) {
          console.log(resp)
        }
      }, (err) => {})
    }
  }

  onChangeActivity(activityCode: any) {
    this.activityInfo.token = sessionStorage.getItem("authToken");
    this.activityInfo.flag = sessionStorage.getItem("role");
    this.activityInfo.activityCode = activityCode;

    if (activityCode != "") {
      this.activityService.getActivityInfoByCode(this.activityInfo).subscribe((resp: any) => {
        const dataList = JSON.parse(JSON.stringify(resp));

        if (resp.code === 1) {
          this.activityInfo = dataList.data[0];
          this.isDocListHave = true;
        }
      })
    }
  }

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
      value: ['', Validators.required],
      valueList: this.formBuilder.array([])
    })
  }

  createValueArrayForm() {
    return this.formBuilder.group({
      'fileValue': ['', Validators.required]
    })
  }

}
