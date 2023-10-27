import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChairPerson } from 'src/app/models/ChairPerson/chair-person';
import { Request } from 'src/app/models/Request/request';
import { Region } from 'src/app/models/Region/region';
import { RegionService } from 'src/app/shared/services/region/region.service';
import { Zone } from 'src/app/models/Zone/zone';
import { ZoneService } from 'src/app/shared/services/zone/zone.service';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chairpersons',
  templateUrl: './chairpersons.component.html',
  styleUrls: ['./chairpersons.component.css']
})
export class ChairpersonsComponent implements OnInit {

  requestModel = new Request();
  regionList: Region[] = [];
  regionChairpersonList: ChairPerson[] = [];
  zonalChairpersonList: ChairPerson[] = [];
  chairPersonModel = new ChairPerson();
  regionChairPersonForm!: FormGroup;
  zonalChairPersonForm!: FormGroup;
  updateRegionChairpersonForm!: FormGroup;
  updateZonalChairpersonForm!: FormGroup;
  requestMdoel = new Request();
  searchParamModel = new SearchParam();
  zoneList: Zone[] = [];

  constructor(private router: Router, private userService: UsersService, private formBuilder: FormBuilder, private regionService: RegionService
            , private zoneService: ZoneService, private tostr: ToastrService) { }

  ngOnInit(): void {
    this.initCreateRegionChairPersonForm();
    this.initCreateZonalChairPersonsForm();
    this.initUpdateReionChairpersonForm();
    this.initUpdateZonalChairpersonForm();
    this.getRegionList();
    this.getZoneList();
    this.loadRegionChairpersonList();
    this.loadZonalChairpersonList();
  }

  onLoadZonalChairPersonInfo(zonalChairpersonCode: string) {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.zonalChairpersonCode = zonalChairpersonCode;

    this.userService.getZonalChairPersonInfoByCode(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.updateZonalChairpersonForm.controls['code'].setValue(dataList.data[0].code);
        this.updateZonalChairpersonForm.controls['name'].setValue(dataList.data[0].name);
        this.updateZonalChairpersonForm.controls['email'].setValue(dataList.data[0].email);
        this.updateZonalChairpersonForm.controls['zoneCode'].setValue(dataList.data[0].zoneCode);
      }
    })
  }

  onSubmitUpdateZonalChairpersonForm() {
    const code = this.updateZonalChairpersonForm.controls['code'].value;
    const name = this.updateZonalChairpersonForm.controls['name'].value;
    const email = this.updateZonalChairpersonForm.controls['email'].value;
    const zoneCode = this.updateZonalChairpersonForm.controls['zoneCode'].value;

    if (code == "") {

    } else if (name == "") {

    } else if (email == "") {

    } else if (zoneCode == "") {

    } else {
      this.chairPersonModel.zonalChairpersonCode = code;
      this.chairPersonModel.fullName = name;
      this.chairPersonModel.email = email;
      this.chairPersonModel.zoneCode = zoneCode;
      this.chairPersonModel.token = sessionStorage.getItem("authToken");
      this.chairPersonModel.flag = sessionStorage.getItem("role");

      this.userService.updateZonalChairPersonByCode(this.chairPersonModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Update Zone", "Zone Update Successfully");
        }
      })
    }
  }

  onLoadReionChairPersonInfo(reChairPersonCode: string) {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.reChairPersonCode = reChairPersonCode;

    this.userService.getRegionChairPersonData(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.updateRegionChairpersonForm.controls['code'].setValue(dataList.data[0].code);
        this.updateRegionChairpersonForm.controls['name'].setValue(dataList.data[0].name);
        this.updateRegionChairpersonForm.controls['email'].setValue(dataList.data[0].email);
        this.updateRegionChairpersonForm.controls['reCode'].setValue(dataList.data[0].reCode);
      }
    })
  } 

  onSubmitUpdateReionChairpersonForm() {
    const code = this.updateRegionChairpersonForm.controls['code'].value;
    const reCode = this.updateRegionChairpersonForm.controls['reCode'].value;
    const name = this.updateRegionChairpersonForm.controls['name'].value;
    const email = this.updateRegionChairpersonForm.controls['email'].value;

    if (reCode == "") {

    } else if (name == "") {

    } else {
      this.chairPersonModel.reChairPersonCode = code;
      this.chairPersonModel.fullName = name;
      this.chairPersonModel.email = email;
      this.chairPersonModel.regionCode = reCode;

      this.userService.updateRegionChairPersonByCode(this.chairPersonModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Update Region", "Region Update Successfully");
        }
      })
    }
  }

  loadZonalChairpersonList() {
    this.requestMdoel.token = sessionStorage.getItem("authToken");
    this.requestMdoel.flag = sessionStorage.getItem("role");

    this.userService.getZonalChairPersonList(this.requestMdoel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachUser: ChairPerson) => {
          this.zonalChairpersonList.push(eachUser)
        })
      }
    })
  }

  loadRegionChairpersonList() {
    this.requestMdoel.token = sessionStorage.getItem("authToken");
    this.requestMdoel.flag = sessionStorage.getItem("role");

    this.userService.getRegionChairPersonList(this.requestMdoel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachUser: ChairPerson) => {
          this.regionChairpersonList.push(eachUser);
        })
      }
    })
  }

  getZoneList() {
    this.requestMdoel.token = sessionStorage.getItem("authToken");
    this.requestMdoel.flag = sessionStorage.getItem("role");

    this.zoneService.getZoneList(this.requestMdoel).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachZone: Zone) => {
          this.zoneList.push(eachZone);
        })
      }
    }, (err) => {

    })
  }

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

  onSubmitCreateZonalChairPerson() {
    const code = this.zonalChairPersonForm.controls['code'].value;
    const name = this.zonalChairPersonForm.controls['name'].value;
    const email = this.zonalChairPersonForm.controls['email'].value;
    const zoneCode = this.zonalChairPersonForm.controls['zoneCode'].value;

    if (code == "") {

    } else if (name == "") {

    } else if (email == "") {

    } else {
      this.chairPersonModel.zonalChairpersonCode = code;
      this.chairPersonModel.fullName = name;
      this.chairPersonModel.email = email;
      this.chairPersonModel.zoneCode = zoneCode;

      this.chairPersonModel.token = sessionStorage.getItem("authToken");
      this.chairPersonModel.flag = sessionStorage.getItem("role");

      this.userService.createZonalChairPerson(this.chairPersonModel).subscribe((resp: any) => {
        if (resp.code === 1) {
          this.tostr.success("Create Zonal Chairperson", "Zone Chairperson Created Successfully");
        }
      }, (err) => {

      })
    }
  }

  initCreateZonalChairPersonsForm() {
    this.zonalChairPersonForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      zoneCode: ['', Validators.required]
    })
  }

  onSubmitCreateRegionChairPerson() {

    const code = this.regionChairPersonForm.controls['code'].value;
    const name = this.regionChairPersonForm.controls['name'].value;
    const email = this.regionChairPersonForm.controls['email'].value;
    const reCode = this.regionChairPersonForm.controls['reCode'].value;

    if (code == "") {

    } else if (name == "") {

    } else if (email == "") {

    } else {
      this.chairPersonModel.reChairPersonCode = code;
      this.chairPersonModel.fullName = name;
      this.chairPersonModel.email = email;
      this.chairPersonModel.regionCode = reCode;

      this.chairPersonModel.token = sessionStorage.getItem("authToken");
      this.chairPersonModel.flag = sessionStorage.getItem("role");

      this.userService.createRegionChairPerson(this.chairPersonModel).subscribe((resp: any) => {
        if (resp.code === 1) {
          this.tostr.success("Create Region Chairperson", "Region Chairperson Created Successfully");
        }
      }, (err) => {

      })
    }
  }

  initCreateRegionChairPersonForm() {
    this.regionChairPersonForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      reCode: ['' ,Validators.required]
    })
  }

  initUpdateReionChairpersonForm() {
    this.updateRegionChairpersonForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      reCode: ['' ,Validators.required]
    })
  }

  initUpdateZonalChairpersonForm() {
    this.updateZonalChairpersonForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      zoneCode: ['' ,Validators.required]
    })
  }

}
