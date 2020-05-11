import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DashComponent } from './components/dash/dash.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/users/user.component';
import { UserCollapseComponent } from './components/users/collapse/user-collapse.component';
import { UserService } from './services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

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
    FormsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    JwtModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      const token = `Bearer ${localStorage.getItem('token') || null}`;
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: 'http://localhost:4000/graphql',
          headers: new HttpHeaders({
            Authorization: token
          })
        })
      };
    },
    deps: [HttpLink]
  },
    UserService,
    AuthGuardService,
    AuthService,
  {
    provide: JWT_OPTIONS,
    useValue: JWT_OPTIONS
  },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
