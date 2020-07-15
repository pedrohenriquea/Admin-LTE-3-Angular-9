import { MainRoutingModule } from './main-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { MainComponent } from './main.component';
import { HomeComponent } from './shared/views/home/home.component';
import { MenuComponent } from './shared/components/template/menu/menu.component';
import { FooterComponent } from './shared/components/template/footer/footer.component';
import { HeaderComponent } from './shared/components/template/header/header.component';



@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: "toast-top-right",
      closeButton: true,
      timeOut: 4000,
      progressBar: true
    }),
    BsDatepickerModule.forRoot(),
    NgxPaginationModule
  ]
})
export class MainModule { }
