import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthModuleRoutingModule } from './auth-module-routing.module';
import { SigninComponent } from './signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePwComponent } from './change-pw/change-pw.component';

@NgModule({
  declarations: [
    SigninComponent,
    ChangePwComponent,
  ],
  imports: [
    CommonModule,
    AuthModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModuleModule { }
