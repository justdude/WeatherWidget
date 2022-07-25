import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WeatherContentComponent } from './weather/weather-content/weather-content.component';
import { WeatherInputComponent } from './weather/weather-input/weather-input.component';
import { WeatherElementComponent } from './weather/weather-element/weather-element.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WeatherContentComponent,
    WeatherInputComponent,
    WeatherElementComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
