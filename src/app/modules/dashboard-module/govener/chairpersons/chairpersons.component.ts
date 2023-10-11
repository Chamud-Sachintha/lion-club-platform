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

@Component({
  selector: 'app-chairpersons',
  templateUrl: './chairpersons.component.html',
  styleUrls: ['./chairpersons.component.css']
})
export class ChairpersonsComponent implements OnInit {

  requestModel = new Request();
  regionList: Region[] = [];
  chairPersonModel = new ChairPerson();
  regionChairPersonForm!: FormGroup;
  zonalChairPersonForm!: FormGroup;
  requestMdoel = new Request();
  zoneList: Zone[] = [];

  constructor(private router: Router, private userService: UsersService, private formBuilder: FormBuilder, private regionService: RegionService
            , private zoneService: ZoneService) { }

  ngOnInit(): void {
    this.initCreateRegionChairPersonForm();
    this.initCreateZonalChairPersonsForm();
    this.getRegionList();
    this.getZoneList();
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
          console.log(resp);
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
          console.log(resp)
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

}
