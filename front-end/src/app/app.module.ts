import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './users/user.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashComponent } from './dash/dash.component';
import { UserCollapseComponent } from './users/collapse/user-collapse.component';


@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    HeaderComponent,
    LoginComponent,
    UserComponent,
    UserCollapseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
