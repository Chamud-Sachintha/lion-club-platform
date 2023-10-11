import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Club } from 'src/app/models/Club/club';
import { Request } from 'src/app/models/Request/request';
import { Zone } from 'src/app/models/Zone/zone';
import { ClubService } from 'src/app/shared/services/club/club.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { ZoneService } from 'src/app/shared/services/zone/zone.service';

@Component({
  selector: 'app-manage-clubs',
  templateUrl: './manage-clubs.component.html',
  styleUrls: ['./manage-clubs.component.css']
})
export class ManageClubsComponent implements OnInit {

  clubModel = new Club();
  requestMdoel = new Request();
  zoneList: Zone[] = [];
  addClubForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private usersService: UsersService
            , private zoneService: ZoneService, private clubService: ClubService) {}

  ngOnInit(): void {
    this.initAddClubForm();
    this.getZoneList();
  }

  onSubmitAddClubDetailsForm() {
    const clubCode = this.addClubForm.controls['clubCode'].value;
    const zoneCode = this.addClubForm.controls['zoneCode'].value;

    if (clubCode == "") {

    } else if (zoneCode == "") {

    } else {
      this.clubModel.clubCode = clubCode;
      this.clubModel.zoneCode = zoneCode;
      this.clubModel.token = sessionStorage.getItem("authToken");
      this.clubModel.flag = sessionStorage.getItem("role");

      this.clubService.addNewClub(this.clubModel).subscribe((resp: any) => {
        if (resp.code === 1) {
          console.log(resp)
        }
      }, (err) => {})
    }
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

  initAddClubForm() {
    this.addClubForm = this.formBuilder.group({
      clubCode: ['', Validators.required],
      zoneCode: ['', Validators.required]
    })
  }

}
