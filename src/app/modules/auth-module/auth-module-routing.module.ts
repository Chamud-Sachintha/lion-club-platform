import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { ChangePwComponent } from './change-pw/change-pw.component';
import { ForgotPwComponent } from './forgot-pw/forgot-pw.component';
import { ResetPwComponent } from './reset-pw/reset-pw.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    children: [
      {
        path: '',
        component: SigninComponent
      }
    ]
  },

  {
    path: 'change-pw',
    component: ChangePwComponent,
    pathMatch: 'full'
  },
  {
    path: 'forgot-pw',
    component: ForgotPwComponent,
    pathMatch: 'full'
  },
  {
    path: 'reset-pw',
    component: ResetPwComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthModuleRoutingModule { }
