import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { WebLayoutComponent } from './layouts/web-layout/web-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DashboardHeaderComponent } from './shared/dashboard-header/dashboard-header.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { FilterDataPipe } from './shared/pipes/filter-data.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    WebLayoutComponent,
    DashboardLayoutComponent,
    DashboardHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
