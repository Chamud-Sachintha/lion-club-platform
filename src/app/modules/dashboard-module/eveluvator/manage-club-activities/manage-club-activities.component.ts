import { Component, OnInit } from '@angular/core';
import { ClubActivity } from 'src/app/models/ClubActivity/club-activity';
import { Region } from 'src/app/models/Region/region';
import { Request } from 'src/app/models/Request/request';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { Zone } from 'src/app/models/Zone/zone';
import { ClubActivityServiceService } from 'src/app/shared/services/club-activity-service/club-activity-service.service';
import { RegionService } from 'src/app/shared/services/region/region.service';
import { ZoneService } from 'src/app/shared/services/zone/zone.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProofDoc } from 'src/app/models/ProofDoc/proof-doc';
import { Activity } from 'src/app/models/Activity/activity';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manage-club-activities',
  templateUrl: './manage-club-activities.component.html',
  styleUrls: ['./manage-club-activities.component.css']
})
export class ManageClubActivitiesComponent implements OnInit {

  regionList: Region[] = [];
  zoneList: Zone[] = [];
  requestModel = new Request();
  activityModel = new Activity();
  searchParamModel = new SearchParam();
  clubActivityList: ClubActivity[] = [];
  clubActivityDocList: ProofDoc[] = [];
  clubActiviyImageList: any[] = [];
  checkClubActivityForm!: FormGroup;
  filterClubActivityListForm!: FormGroup;
  zoneModel = new Zone();

  constructor (private regionService: RegionService, private zoneService: ZoneService
              , private clubActivityService: ClubActivityServiceService
              , private formBuilder: FormBuilder
              , private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadAvailableRegionList();
    this.loadClubActivityList();
    this.initCheckActivityForm();
    this.initFilterClubActivityListForm();
  }

  initFilterClubActivityListForm() {
    this.filterClubActivityListForm = this.formBuilder.group({
      reCode: ['', Validators.required],
      zoneCode: ['', Validators.required]
    })
  }

  onSubmitFilterClubListForm() {
    this.clubActivityList = [];
    const reCode = this.filterClubActivityListForm.controls['reCode'].value;
    const zoneCode = this.filterClubActivityListForm.controls['zoneCode'].value;

    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.regionCode = reCode;
    this.searchParamModel.zoneCode = zoneCode;

    this.clubActivityService.filterClubActivityList(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachActivity: ClubActivity) => {
          const date = parseInt(eachActivity.createTime) * 1000;
          eachActivity.createTime = date.toString();
          this.clubActivityList.push(eachActivity)
        })
      }
    })
  }

  onUpdateCheckClubActivityForm() {

    const activityCode = this.checkClubActivityForm.controls['activityCode'].value;
    const status = this.checkClubActivityForm.controls['status'].value;

    if (status == 0) {

    } else {
      this.requestModel.token = sessionStorage.getItem("authToken");
      this.requestModel.flag = sessionStorage.getItem("role");
      this.requestModel.activityCode = activityCode;
      this.requestModel.status = status;

      this.clubActivityService.updateClubActivityStatusByEvaluvator(this.requestModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.toastr.success("Update Club Activity", "Update Successfully");
        }
      })
    }
  }

  onClickViewImage(imageName: string) {
    const fileServer = environment.fileServer + "modo/images/" + imageName;
    window.open(fileServer);

    return false;
  }

  onClickViewDocument(documentName: string) {
    const fileServer = environment.fileServer + "modo/docs/" + documentName;
    window.open(fileServer);

    return false;
  }

  getClubActivityInfo(activityCode: string) {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.activityCode = activityCode;

    this.clubActivityService.getClubSctivityInfoByCode(this.searchParamModel).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      this.checkClubActivityForm.controls['activityName'].setValue(dataList.data[0].activityName);
      this.checkClubActivityForm.controls['clubCode'].setValue(dataList.data[0].clubCode);
      this.checkClubActivityForm.controls['status'].setValue(dataList.data[0].status)
      this.checkClubActivityForm.controls['activityCode'].setValue(dataList.data[0].clubActivityId);
    })

    this.clubActivityService.getClubActivityDocByCode(this.searchParamModel).subscribe((resp: any) => {
      this.clubActivityDocList = [];
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachDoc: ProofDoc) => {
          this.clubActivityDocList.push(eachDoc);
        })
      }
    })

    this.clubActivityService.getClubActivityImagesByCode(this.searchParamModel).subscribe((resp: any) => {
      this.clubActiviyImageList = [];
      const dataList = JSON.parse(JSON.stringify(resp))

      if (resp.code === 1) {
        dataList.data[0].forEach((eachImage: any) => {
          this.clubActiviyImageList.push(eachImage);
        })
      }
    })
  }

  initCheckActivityForm() {
    this.checkClubActivityForm = this.formBuilder.group({
      activityName: ['', Validators.required],
      clubCode: ['', Validators.required],
      status: ['', Validators.required],
      activityCode: ['', Validators.required]
    })
  }

  loadClubActivityList() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");

    this.clubActivityService.getAllClubActivityList(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachClubActivity: ClubActivity) => {
          const date = parseInt(eachClubActivity.createTime) * 1000;
          eachClubActivity.createTime = date.toString();
          this.clubActivityList.push(eachClubActivity);
        })
      }
    })
  }

  onChangeRegion(reCode: any) {
    this.zoneList = [];
    this.zoneModel.token = sessionStorage.getItem("authToken");
    this.zoneModel.flag = sessionStorage.getItem("role");
    this.zoneModel.regionCode = reCode;

    this.zoneService.getZoneListByReCode(this.zoneModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp))

      if (resp.code === 1) {
        dataList.data[0].forEach((eachZone: Zone) => {
          this.zoneList.push(eachZone);
        })
      }
    }, (err) => {})
  }

  loadAvailableRegionList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.regionService.getRegionList(this.requestModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachRegion: Region) => {
          this.regionList.push(eachRegion);
        })
      }
    }, (err) => {})
  }

}
