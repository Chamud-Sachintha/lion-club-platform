import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Club } from 'src/app/models/Club/club';
import { Request } from 'src/app/models/Request/request';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { Zone } from 'src/app/models/Zone/zone';
import { ClubService } from 'src/app/shared/services/club/club.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { ZoneService } from 'src/app/shared/services/zone/zone.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-clubs',
  templateUrl: './manage-clubs.component.html',
  styleUrls: ['./manage-clubs.component.css']
})
export class ManageClubsComponent implements OnInit {

  clubModel = new Club();
  requestMdoel = new Request();
  clubList: Club[] = [];
  zoneList: Zone[] = [];
  searchParamModel = new SearchParam();
  addClubForm!: FormGroup;
  updateClubForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private usersService: UsersService
            , private zoneService: ZoneService, private clubService: ClubService, private tostr: ToastrService) {}

  ngOnInit(): void {
    this.initAddClubForm();
    this.initUpdateClubForm();
    this.getZoneList();
    this.loadClubList();
  }

  deleteClubByCode(clubCode: string) {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.clubCode = clubCode;

    this.clubService.deleteClubByCode(this.searchParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.tostr.success("Delelete Club", "Club Delete Successfully");
        location.reload();
      } else {
        this.tostr.error("Delete Club", resp.message);
      }
    })
  }

  onLoadClubInfo(clubCode: string) {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.clubCode = clubCode;

    this.clubService.getClubInfoByCode(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.updateClubForm.controls['clubCode'].setValue(dataList.data[0].code);
        this.updateClubForm.controls['zoneCode'].setValue(dataList.data[0].zoneCode); 
      }
    })
  }

  onSubmitUpdateClubForm() {
    const code = this.updateClubForm.controls['clubCode'].value;
    const zoneCode = this.updateClubForm.controls['zoneCode'].value;

    if (code == "") {

    } else if (zoneCode == "") {

    } else {
      this.clubModel.clubCode = code;
      this.clubModel.zoneCode = zoneCode;
      this.clubModel.token = sessionStorage.getItem("authToken");
      this.clubModel.flag = sessionStorage.getItem("role");

      this.clubService.updateClubByCode(this.clubModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Update Club", "Club Update Successfully");
          location.reload();
        }
      })
    }
  }

  loadClubList() {
    this.clubModel.token = sessionStorage.getItem("authToken");
    this.clubModel.flag = sessionStorage.getItem("role");
    
    this.clubService.getClubList(this.clubModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      dataList.data[0].forEach((eachClub: Club) => {
        this.clubList.push(eachClub);
      })
    })
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
          this.tostr.success("Create Club", "Club Create Successfully");
          location.reload();
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

  initUpdateClubForm() {
    this.updateClubForm = this.formBuilder.group({
      clubCode: ['', Validators.required],
      zoneCode: ['', Validators.required]
    })
  }

}
