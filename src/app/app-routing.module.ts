import { NavbarsComponent } from './navbars/navbars.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'mainscreen',component:NavbarsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
