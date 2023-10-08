import { Component, OnInit   } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainCategory } from 'src/app/models/MainCategory/main-category';
import { MainCategoryService } from 'src/app/shared/services/main-category/main-category.service';

@Component({ 
  selector: 'app-activity-main-category',
  templateUrl: './activity-main-category.component.html',
  styleUrls: ['./activity-main-category.component.css']
})
export class ActivityMainCategoryComponent implements OnInit {

  mainCategoryModel = new MainCategory();
  addMainCategoryForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private mainCategoryService: MainCategoryService) {}

  ngOnInit(): void {
    this.initCraetMainCategoryForm();
  }

  onSubmitCreateMainCategoryForm() {
    const code = this.addMainCategoryForm.controls['code'].value;
    const name = this.addMainCategoryForm.controls['name'].value;

    if (code == "") {

    } else if (name == "") {

    } else {
      this.mainCategoryModel.mainCategoryCode = code;
      this.mainCategoryModel.categoryName = name;
      this.mainCategoryModel.token = sessionStorage.getItem("authToken");
      this.mainCategoryModel.flag = sessionStorage.getItem("role");

      this.mainCategoryService.addNewMainCategory(this.mainCategoryModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          console.log(resp);
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

}