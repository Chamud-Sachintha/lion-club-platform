import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChairPerson } from 'src/app/models/ChairPerson/chair-person';
import { ContextUser } from 'src/app/models/ContextUser/context-user';
import { Region } from 'src/app/models/Region/region';
import { Request } from 'src/app/models/Request/request';
import { RegionService } from 'src/app/shared/services/region/region.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-manage-regions',
  templateUrl: './manage-regions.component.html',
  styleUrls: ['./manage-regions.component.css']
})
export class ManageRegionsComponent implements OnInit {

  regionChairPersonList: ChairPerson[] = [];
  contextUserList: ContextUser[] = [];
  regionModel = new Region();
  requestModel = new Request();
  addRegionDetailsForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private regionService: RegionService
            , private userServcie: UsersService) {}

  ngOnInit(): void {
    this.initCreateNewRegionForm();
    this.loadContextUserList();
  }

  loadContextUserList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.userServcie.getContextUserList(this.requestModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachContextUser: ContextUser) => {
          this.contextUserList.push(eachContextUser);
        })
      }
    }, (err) => {})
  }

  onSubmitAddRegionDetailsForm() {
    const reCode = this.addRegionDetailsForm.controls['reCode'].value;
    const contextUserCode = this.addRegionDetailsForm.controls['contextUserCode'].value;

    if (reCode == "") {

    } else {
      this.regionModel.token = sessionStorage.getItem("authToken");
      this.regionModel.flag = sessionStorage.getItem("role");
      this.regionModel.regionCode = reCode;
      this.regionModel.contextUserCode = contextUserCode;

      this.regionService.createNewRegion(this.regionModel).subscribe((resp) => {
        console.log(resp)
      }, (err) => {

      })
    }
  }

  initCreateNewRegionForm() {
    this.addRegionDetailsForm = this.formBuilder.group({
      reCode: ['', Validators.required],
      contextUserCode: ['', Validators.required]
    })
  }

}
