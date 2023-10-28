import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Perm } from 'src/app/models/Perm/perm';
import { Request } from 'src/app/models/Request/request';
import { UsersService } from '../services/users/users.service';
declare var $: any;

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {

  governerPerm = false;
  clubUserPerm = false;
  contextUserPerm = false;
  evaluvatorPerm = false;
  regionChairPersonPerm = false;
  zonalChairPersonPerm = false;
  menuPermModel = new Perm();
  requestModel = new Request();

  constructor(private router: Router, private authService: AuthService, private userService: UsersService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.checkMenuPermissionForUser();
    }, 600);
  }

  onClickSignOut() {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("clubCode");

    this.router.navigate(['/auth']);
  }

  checkMenuPermissionForUser() {
    this.menuPermModel.token = sessionStorage.getItem("authToken");
    this.menuPermModel.flag = sessionStorage.getItem("role");

    this.authService.checkMenuPerm(this.menuPermModel).subscribe((resp: any) => {
      if (resp.code === 1) {
        if (this.menuPermModel.flag === "G") {
          this.governerPerm = true;
          this.contextUserPerm = false;
          this.evaluvatorPerm = false;
          this.clubUserPerm = false;
          this.regionChairPersonPerm = false;
          this.zonalChairPersonPerm = false;
        } else if (this.menuPermModel.flag == "CU") {
          this.contextUserPerm = false;
          this.governerPerm = false;
          this.evaluvatorPerm = false;
          this.clubUserPerm = true;
          this.regionChairPersonPerm = false;
          this.zonalChairPersonPerm = false;

          this.loadClubUserInfo();
        } else if (this.menuPermModel.flag == "CNTU") {
          this.governerPerm = false;
          this.clubUserPerm = false;
          this.evaluvatorPerm = false;
          this.contextUserPerm = true;
          this.regionChairPersonPerm = false;
          this.zonalChairPersonPerm = false;
        } else if (this.menuPermModel.flag == "E") {
          this.governerPerm = false;
          this.clubUserPerm = false;
          this.contextUserPerm = false;
          this.evaluvatorPerm = true;
          this.regionChairPersonPerm = false;
          this.zonalChairPersonPerm = false;
        } else if (this.menuPermModel.flag == "RC") {
          this.governerPerm = false;
          this.clubUserPerm = false;
          this.contextUserPerm = false;
          this.evaluvatorPerm = false;
          this.regionChairPersonPerm = true;
          this.zonalChairPersonPerm = false;
        } else if (this.menuPermModel.flag == "ZC") {
          this.governerPerm = false;
          this.clubUserPerm = false;
          this.contextUserPerm = false;
          this.evaluvatorPerm = false;
          this.regionChairPersonPerm = false;
          this.zonalChairPersonPerm = true;
        } else {
          this.router.navigate(['auth']);
        }
      }
    }, (err) => {

    })
  }

  loadClubUserInfo() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.userService.getClubUserInfoByEmail(this.requestModel).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        sessionStorage.setItem("clubCode", dataList.data[0].club_code);
      }
    }, (err) => {})
  }

}
