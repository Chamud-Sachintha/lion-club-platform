import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Perm } from 'src/app/models/Perm/perm';
declare var $: any;

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {

  governerPerm = false;
  menuPermModel = new Perm();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.checkMenuPermissionForUser();
    }, 600);
  }

  checkMenuPermissionForUser() {
    this.menuPermModel.token = sessionStorage.getItem("authToken");
    this.menuPermModel.flag = sessionStorage.getItem("role");

    this.authService.checkMenuPerm(this.menuPermModel).subscribe((resp: any) => {
      if (resp.code === 1) {
        if (this.menuPermModel.flag === "G") {
          this.governerPerm = true;
        }
      }
    }, (err) => {

    })
  }

}
