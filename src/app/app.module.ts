import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';

import { FormsModule } from '@angular/forms';





const appRoutes:Routes = [
  { path: '', component: HeaderComponent },

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,


  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes,{enableTracing:true}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
