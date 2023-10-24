import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirstSubCategory } from 'src/app/models/FirstSubCategory/first-sub-category';
import { Request } from 'src/app/models/Request/request';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { SecondSubCategory } from 'src/app/models/SecondSubCategory/second-sub-category';
import { FirstSubCategoryService } from 'src/app/shared/services/first-sub-category/first-sub-category.service';
import { SecondSubCategoryService } from 'src/app/shared/services/second-sub-category/second-sub-category.service';

@Component({
  selector: 'app-activity-second-sub-category',
  templateUrl: './activity-second-sub-category.component.html',
  styleUrls: ['./activity-second-sub-category.component.css']
})
export class ActivitySecondSubCategoryComponent implements OnInit {

  firstSubCategoryList: FirstSubCategory[] = [];
  secondSubCategoryModel = new SecondSubCategory();
  secondSubCategoryList: SecondSubCategory[] = [];
  requestModel = new Request();
  searchParamModel = new SearchParam();
  addsecondSubCategoryForm!: FormGroup;
  updateSecondCategoryForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private firstSubCategoryService: FirstSubCategoryService
            , private secondSubCategoryService: SecondSubCategoryService) {}

  ngOnInit(): void {
    this.initCreateSecondSubCategoryForm();
    this.getFirstSubCategoryList();
    this.loadSecondSubCategoryList();
  }

  onSubmitUpdateSecondCategoryForm() {
    const code = this.addsecondSubCategoryForm.controls['code'].value;
    const categoryName = this.addsecondSubCategoryForm.controls['categoryName'].value;
    const firstCategoryCode = this.addsecondSubCategoryForm.controls['firstCategoryCode'].value;

    if (code == "") {

    } else if (categoryName == "") {

    } else if (firstCategoryCode == "") {

    } else {
      
    }
  }

  onLoadSecondCategoryInfo() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");

    this.secondSubCategoryService.getSecondCategoryInfoByCode(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {

      }
    })
  }

  loadSecondSubCategoryList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.secondSubCategoryService.getSecondCategoryList(this.requestModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachCategory: SecondSubCategory) => {
          this.secondSubCategoryList.push(eachCategory)
        })
      }
    })
  }

  getFirstSubCategoryList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.firstSubCategoryService.getFirstSubcategoryList(this.requestModel).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      dataList.data[0].forEach((firstSubCategory: FirstSubCategory) => {
        this.firstSubCategoryList.push(firstSubCategory);
      })
    }, (err) => {})
  }

  onSubmitCreateSecondSubCategoryForm() {
    const code = this.addsecondSubCategoryForm.controls['code'].value;
    const categoryName = this.addsecondSubCategoryForm.controls['categoryName'].value;
    const firstCategoryCode = this.addsecondSubCategoryForm.controls['firstCategoryCode'].value;

    if (code == "") {

    } else if (categoryName == "") {

    } else if (firstCategoryCode == "") {

    } else {
      this.secondSubCategoryModel.secondSubCategoryCode = code;
      this.secondSubCategoryModel.categoryName = categoryName
      this.secondSubCategoryModel.firstSubCategoryCode = firstCategoryCode;
      this.secondSubCategoryModel.token = sessionStorage.getItem("authToken");
      this.secondSubCategoryModel.flag = sessionStorage.getItem("role");

      this.secondSubCategoryService.addNewSecondSubCategory(this.secondSubCategoryModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          console.log(resp)
        }
      })
    }
  }

  initCreateSecondSubCategoryForm() {
    this.addsecondSubCategoryForm = this.formBuilder.group({
      code: ['', Validators.required],
      firstCategoryCode: ['', Validators.required],
      categoryName: ['', Validators.required]
    })
  }

  initUpdateSecondSubCategoryForm() {
    this.updateSecondCategoryForm = this.formBuilder.group({
      code: ['', Validators.required],
      firstCategoryCode: ['', Validators.required],
      categoryName: ['', Validators.required]
    })
  }

}
