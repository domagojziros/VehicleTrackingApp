import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiAuthorizationModule } from '../api-authorization/api-authorization.module'; // import your module

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ApiAuthorizationModule // add your module here
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
