import { Component, OnInit   } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainCategory } from 'src/app/models/MainCategory/main-category';
import { Request } from 'src/app/models/Request/request';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { MainCategoryService } from 'src/app/shared/services/main-category/main-category.service';
import { ToastrService } from 'ngx-toastr'; 

@Component({ 
  selector: 'app-activity-main-category',
  templateUrl: './activity-main-category.component.html',
  styleUrls: ['./activity-main-category.component.css']
})
export class ActivityMainCategoryComponent implements OnInit {

  mainCategoryModel = new MainCategory();
  requestModel = new Request();
  mainCategoryList: MainCategory[] = [];
  searchParamModel = new SearchParam();
  addMainCategoryForm!: FormGroup;
  updateMainCategoryForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private mainCategoryService: MainCategoryService
            , private toastr: ToastrService) {}

  ngOnInit(): void {
    this.initCraetMainCategoryForm();
    this.initUpdateMainCategoryForm();
    this.loadMainCategoryList()

    this.updateMainCategoryForm.controls['code'].disable();
  }

  deleteMainCategoryByCode(mainCategoryCode: string) {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.mainCategoryCode = mainCategoryCode;

    this.mainCategoryService.deleteMainCategosyByCode(this.searchParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.toastr.success("Delete Main Category", "Main Category Code is Deleted.");
        location.reload();
      } else {
        this.toastr.error("Delete Main Cateory", resp.message);
      }
    })
  }

  onSubmitUpdateMainCategoryForm() {
    const mainCategoryCode = this.updateMainCategoryForm.controls['code'].value;
    const mainCategoryName = this.updateMainCategoryForm.controls['name'].value;

    if (mainCategoryCode == "") {
      this.toastr.error("Empty Feilds Found", "Please Enter Category Code");
    } else if (mainCategoryName == "") {
      this.toastr.error("Empty Feilds Found", "Please Enter Category Name");
    } else {
      this.mainCategoryModel.mainCategoryCode = mainCategoryCode;
      this.mainCategoryModel.categoryName = mainCategoryName;
      this.mainCategoryModel.token = sessionStorage.getItem("authToken");
      this.mainCategoryModel.flag = sessionStorage.getItem("role");

      this.mainCategoryService.updateMainCategoryByCode(this.mainCategoryModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.toastr.success("Update Main Category", "Category Updated Successfully");
          location.reload();
        }
      })
    }
  }

  onLoadMainCategoryInfo(mainCategiryCode: string) {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.mainCategoryCode = mainCategiryCode;

    this.mainCategoryService.getMainCategoryCodeByCode(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.updateMainCategoryForm.controls['code'].setValue(dataList.data[0].mainCategoryCode);
        this.updateMainCategoryForm.controls['name'].setValue(dataList.data[0].mainCategoryName);
      }
    })
  }

  loadMainCategoryList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.mainCategoryService.getMainCategoryList(this.requestModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((mainCategory: MainCategory) => {
          this.mainCategoryList.push(mainCategory);
        })
      }
    })
  }

  onSubmitCreateMainCategoryForm() {
    const code = this.addMainCategoryForm.controls['code'].value;
    const name = this.addMainCategoryForm.controls['name'].value;

    if (code == "") {
      this.toastr.error("Empty Feilds Found", "Please Enter Category Code");
    } else if (name == "") {
      this.toastr.error("Empty Feilds Found", "Please Enter Category Name");
    } else {
      this.mainCategoryModel.mainCategoryCode = code;
      this.mainCategoryModel.categoryName = name;
      this.mainCategoryModel.token = sessionStorage.getItem("authToken");
      this.mainCategoryModel.flag = sessionStorage.getItem("role");

      this.mainCategoryService.addNewMainCategory(this.mainCategoryModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.toastr.success("Add Main Category", "Category Added Successfully.");
          location.reload();
        }
      }, (err) => {})
    }
  }

  initCraetMainCategoryForm() {
    this.addMainCategoryForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required]
    })
  }

  initUpdateMainCategoryForm() {
    this.updateMainCategoryForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required]
    })
  }

}
