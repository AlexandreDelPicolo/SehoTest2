import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DashComponent } from './components/dash/dash.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/users/user.component';
import { UserCollapseComponent } from './components/users/collapse/user-collapse.component';

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
    AppRoutingModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: 'http://localhost:4000/graphql'
        })
      };
    },
    deps: [HttpLink]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
