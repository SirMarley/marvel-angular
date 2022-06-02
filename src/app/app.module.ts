import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
import { HeroDetailsComponent } from './pages/hero-details/hero-details.component';
import { DetailsCardComponent } from './components/details-card/details-card.component';
import { SearchDetailsComponent } from './components/search-details/search-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    EditModalComponent,
    HeroDetailsComponent,
    DetailsCardComponent,
    SearchDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
