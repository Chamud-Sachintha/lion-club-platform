import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChairPerson } from 'src/app/models/ChairPerson/chair-person';
import { ContextUser } from 'src/app/models/ContextUser/context-user';
import { Region } from 'src/app/models/Region/region';
import { Request } from 'src/app/models/Request/request';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { RegionService } from 'src/app/shared/services/region/region.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-regions',
  templateUrl: './manage-regions.component.html',
  styleUrls: ['./manage-regions.component.css']
})
export class ManageRegionsComponent implements OnInit {

  regionChairPersonList: ChairPerson[] = [];
  contextUserList: ContextUser[] = [];
  regionList: Region[] = [];
  regionModel = new Region();
  requestModel = new Request();
  searchParamModel = new SearchParam();
  addRegionDetailsForm!: FormGroup;
  updateRegionsForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private regionService: RegionService
            , private userServcie: UsersService, private tostr: ToastrService) {}

  ngOnInit(): void {
    this.initCreateNewRegionForm();
    this.initUpdateRegionsForm();
    this.loadContextUserList();
    this.getRegionList();
  }

  deleteRegionByCode(reCode: string) {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.regionCode = reCode;

    this.regionService.deleteRegionByCode(this.searchParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.tostr.success("Delete Region", "Region deletre Successfully.");
        location.reload();
      } else {
        this.tostr.error("Delete Region", resp.message);
      }
    })
  }

  onLoadRegionInfo(regionCode: string) {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.regionCode = regionCode;

    this.regionService.getRegionInfoByReCode(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp))

      if (resp.code === 1) {
        this.updateRegionsForm.controls['reCode'].setValue(dataList.data[0].code);
        this.updateRegionsForm.controls['contextUserCode'].setValue(dataList.data[0].contextUserCode);
      }
    })
  }

  onSubmitUpdateRegionsForm() {
    const reCode = this.updateRegionsForm.controls['reCode'].value;
    const contextUserCode = this.updateRegionsForm.controls['contectUserCode'].value;

    if (reCode == "") {

    } else if (contextUserCode == "") {

    } else {
      this.regionModel.regionCode = reCode;
      this.regionModel.contextUserCode = contextUserCode;
      this.regionModel.token = sessionStorage.getItem("authToken");
      this.regionModel.flag = sessionStorage.getItem("role");

      this.regionService.updateRegionVyCode(this.regionModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Update Region", "Region Update Successfully");
          location.reload();
        }
      })
    }
  }

  getRegionList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.regionService.getRegionList(this.requestModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachRegion: Region) => {
          this.regionList.push(eachRegion);
        })
      }
    })
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
        this.tostr.success("Create Region", "Region Create Successfully");
        location.reload();
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

  initUpdateRegionsForm() {
    this.updateRegionsForm = this.formBuilder.group({
      reCode: ['', Validators.required],
      contextUserCode: ['', Validators.required]
    })
  }

}
