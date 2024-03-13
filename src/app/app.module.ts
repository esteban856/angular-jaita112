import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginformComponent } from './loginform/loginform.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AreastudentiComponent } from './areastudenti/areastudenti.component';

const routes : Routes = [
  {
    //http://localhost:4200/loginpage
    path: 'loginpage',
    component: LoginformComponent
  },
  {
    //http://localhost:4200/areastudenti
    path: 'areastudenti',
    component: AreastudentiComponent
  },
]


@NgModule({
  declarations: [
    AppComponent,
    LoginformComponent,
    AreastudentiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
