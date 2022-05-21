import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PrefecturesComponent } from './prefectures/prefectures.component';
import { GraphComponent } from './graph/graph.component';
import { HeaderComponent } from './header/header.component';
import { PrefectureService } from './prefecture.service';
import { PopulationCompositionService } from './population-composition.service';

@NgModule({
  declarations: [
    AppComponent,
    PrefecturesComponent,
    GraphComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [PrefectureService,PopulationCompositionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
