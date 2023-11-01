import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirstSubCategory } from 'src/app/models/FirstSubCategory/first-sub-category';
import { MainCategory } from 'src/app/models/MainCategory/main-category';
import { Request } from 'src/app/models/Request/request';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { FirstSubCategoryService } from 'src/app/shared/services/first-sub-category/first-sub-category.service';
import { MainCategoryService } from 'src/app/shared/services/main-category/main-category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activity-first-sub-category',
  templateUrl: './activity-first-sub-category.component.html',
  styleUrls: ['./activity-first-sub-category.component.css']
})
export class ActivityFirstSubCategoryComponent implements OnInit {

  firstSubCategoryModel = new FirstSubCategory();
  mainCategoryList: MainCategory[] = [];
  requestModel = new Request();
  firstSubCategoryList: FirstSubCategory[] = [];
  searchParamModel = new SearchParam();
  addFirstSubCategoryForm!: FormGroup;
  updateFirstCategoryForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private firstSubCategoryService: FirstSubCategoryService
            , private mainCategoryService: MainCategoryService
            , private toastr: ToastrService) {}

  ngOnInit(): void {
    this.initCreateFirstSubcategoryForm();
    this.initUpdateFirstCategoryForm();
    this.getMainCategoryList();
    this.loadFirstSubCategoryList();
  }

  deleteFirstCategoryByCode(categoryCode: string) {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.firstCategoryCode = categoryCode;

    this.firstSubCategoryService.deleteFirstCateoryByCode(this.searchParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.toastr.success("Delete Ceteory" , "Category Delete Successfully.");
      } else {
        this.toastr.error("Category Delete", resp.message);
      }
    })
  }

  onLoadFirstCategoryInfo(firstCategoryCode: string) {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.firstCategoryCode = firstCategoryCode;

    this.firstSubCategoryService.getFirstCategoryInfoByCode(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.updateFirstCategoryForm.controls['code'].setValue(dataList.data[0].firstCategoryCode);
        this.updateFirstCategoryForm.controls['mainCategoryCode'].setValue(dataList.data[0].mainCategoryCode);
        this.updateFirstCategoryForm.controls['name'].setValue(dataList.data[0].categoryName)
      }
    })
  }

  onSubmitUpdateFirstCategoryForm() {
    const firstCatCode = this.updateFirstCategoryForm.controls['code'].value;
    const name = this.updateFirstCategoryForm.controls['name'].value;
    const maincategoryCode = this.updateFirstCategoryForm.controls['mainCategoryCode'].value;

    if (firstCatCode == "") {

    } else if (name == "") {

    } else {
      this.firstSubCategoryModel.firstSubCategoryCode = firstCatCode;
      this.firstSubCategoryModel.mainCategoryCode = maincategoryCode;
      this.firstSubCategoryModel.categoryName = name;
      this.firstSubCategoryModel.token = sessionStorage.getItem("authToken");
      this.firstSubCategoryModel.flag = sessionStorage.getItem("role");

      this.firstSubCategoryService.updateFirstCategoryByCode(this.firstSubCategoryModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.toastr.success("Update First Sub Category", "Category Updated Successfully");
        }
      })
    }
  }

  loadFirstSubCategoryList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.firstSubCategoryService.getFirstSubcategoryList(this.requestModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachCatgory: FirstSubCategory) => {
          this.firstSubCategoryList.push(eachCatgory);
        })
      }
    })
  }

  getMainCategoryList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.mainCategoryService.getMainCategoryList(this.requestModel).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      dataList.data[0].forEach((eachCategory: MainCategory) => {
        this.mainCategoryList.push(eachCategory);
      })
    })
  }

  onSubmitCreateFirstSubCategoryForm() {
    const code = this.addFirstSubCategoryForm.controls['code'].value;
    const name = this.addFirstSubCategoryForm.controls['name'].value;
    const maincategoryCode = this.addFirstSubCategoryForm.controls['mainCategoryCode'].value;
    console.log(code, name)
    if (code == "") {

    } else if (name == "") {

    } else {
      this.firstSubCategoryModel.firstSubCategoryCode = code;
      this.firstSubCategoryModel.categoryName = name;
      this.firstSubCategoryModel.mainCategoryCode = maincategoryCode;
      this.firstSubCategoryModel.token = sessionStorage.getItem("authToken");
      this.firstSubCategoryModel.flag = sessionStorage.getItem("role");

      this.firstSubCategoryService.addFirstSubCategory(this.firstSubCategoryModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.toastr.success("Add First Sub Category", "Category Added Successfully");
        }
      }, (err) => {})
    }
  }

  initCreateFirstSubcategoryForm() {
    this.addFirstSubCategoryForm = this.formBuilder.group({
      code: ['', Validators.required],
      mainCategoryCode: ['', Validators.required],
      name: ['', Validators.required]
    })
  }

  initUpdateFirstCategoryForm() {
    this.updateFirstCategoryForm = this.formBuilder.group({
      code: ['', Validators.required],
      mainCategoryCode: ['', Validators.required],
      name: ['', Validators.required]
    })
  }

}
