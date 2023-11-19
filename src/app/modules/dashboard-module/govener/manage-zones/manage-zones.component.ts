import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChairPerson } from 'src/app/models/ChairPerson/chair-person';
import { Region } from 'src/app/models/Region/region';
import { Request } from 'src/app/models/Request/request';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { Zone } from 'src/app/models/Zone/zone';
import { RegionService } from 'src/app/shared/services/region/region.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { ZoneService } from 'src/app/shared/services/zone/zone.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-zones',
  templateUrl: './manage-zones.component.html',
  styleUrls: ['./manage-zones.component.css']
})
export class ManageZonesComponent implements OnInit {

  zonalChairPersonList: ChairPerson[] = [];
  regionList: Region[] = [];
  zoneList: Zone[] = [];
  requestModel = new Request();
  zonalInfoModel = new Zone();
  searchParamModel = new SearchParam();
  addZoneDetailsForm!: FormGroup;
  updateZoneForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private usersService: UsersService
            , private regionService: RegionService, private zoneService: ZoneService, private tostr: ToastrService) {}

  ngOnInit(): void {
    this.initAddZoneDetailsForm();
    this.initUpdateZoneForm();
    this.getRegionList();
    this.getZoneList();
  }

  deleteZoneByCode(zoneCode: string) {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.zoneCode = zoneCode;

    this.zoneService.deleteZoneService(this.searchParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.tostr.success("Delete zone", "Zone Delete successfully");
        location.reload();
      } else {
        this.tostr.error("Delete Zonbe", resp.message);
      }
    })
  }

  onLoadMainCategoryInfo(zoneCode: string) {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.zoneCode = zoneCode;

    this.zoneService.getZoneByZoneCode(this.searchParamModel).subscribe((resp: any) => {
      
      const dataList = JSON.parse(JSON.stringify(resp))

      if (resp.code === 1) {
        this.updateZoneForm.controls['zoneCode'].setValue(dataList.data[0].code);
        this.updateZoneForm.controls['reCode'].setValue(dataList.data[0].reCode);
      }
    })
  }

  onSubmitUpdateZoneForm() {
    const code = this.updateZoneForm.controls['zoneCode'].value;
    const reCode = this.updateZoneForm.controls['reCode'].value;

    if (code == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Zone Code");
    } else if (reCode == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Region Code");
    } else {
      this.zonalInfoModel.zoneCode = code;
      this.zonalInfoModel.regionCode = reCode;
      this.zonalInfoModel.token = sessionStorage.getItem("authToken");
      this.zonalInfoModel.flag = sessionStorage.getItem("role");

      this.zoneService.updateZoneByCode(this.zonalInfoModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Update Zone", "Zone Update Successfully");
          location.reload();
        }
      })
    }
  }

  getZoneList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.zoneService.getZoneList(this.requestModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachZone: Zone) => {
          this.zoneList.push(eachZone)
        })
      }
    })
  }

  onSubmitCreateZoneDetailsForm() {
    const zoneCode = this.addZoneDetailsForm.controls['zoneCode'].value;
    // const chairPersonCode = this.addZoneDetailsForm.controls['chairPersonCode'].value;
    const reCode = this.addZoneDetailsForm.controls['reCode'].value;

    if (zoneCode == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Zone Code");
    } else if (reCode == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Region Code");
    } else {
      this.zonalInfoModel.zoneCode = zoneCode;
      this.zonalInfoModel.regionCode = reCode;
      this.zonalInfoModel.token = sessionStorage.getItem("authToken");
      this.zonalInfoModel.flag = sessionStorage.getItem("role");

      this.zoneService.createNewZone(this.zonalInfoModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Create Zone", "Zone Created Successfully");
          location.reload();
        }
      }, (err) => {

      })
    }
  }

  // getZonalChairPersonList() {
  //   this.requestModel.token = sessionStorage.getItem("authToken");
  //   this.requestModel.flag = sessionStorage.getItem("role");

  //   this.usersService.getZonalChairPersonList(this.requestModel).subscribe((resp: any) => {
  //     const dataList = JSON.parse(JSON.stringify(resp));

  //     if (resp.code === 1) {
  //       dataList.data[0].forEach((chairPerson: ChairPerson) => {
  //         this.zonalChairPersonList.push(chairPerson);
  //       })
  //     }
  //   }, (err) => {})
  // }

  getRegionList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.regionService.getRegionList(this.requestModel).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachRegion: Region) => {
          this.regionList.push(eachRegion)
        })
      }
    }, (err) => {})
  }

  initAddZoneDetailsForm() {
    this.addZoneDetailsForm = this.formBuilder.group({
      zoneCode: ['', Validators.required],
      chairPersonCode: ['', Validators.required],
      reCode: ['', Validators.required]
    })
  }

  initUpdateZoneForm() {
    this.updateZoneForm = this.formBuilder.group({
      zoneCode: ['', Validators.required],
      chairPersonCode: ['', Validators.required],
      reCode: ['', Validators.required]
    })
  }

}
