import { AuthGuard } from './../guards/auth.guard';
import { HomeComponent } from './shared/views/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';


const routes: Routes = [
  { 
    path: 'prefeitura',
    component: MainComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      {path: '', component: HomeComponent},
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
