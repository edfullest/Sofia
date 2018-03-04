import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateGameComponent } from './rate-game/rate-game.component';
import { RateCourseComponent } from './rate-course/rate-course.component';
import { RateComponent } from './rate.component';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon"; // <----- Here
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    FlexLayoutModule
  ],
  declarations: [RateGameComponent, RateCourseComponent, RateComponent],
  exports : [RateGameComponent, RateCourseComponent, RateComponent]
})
export class RateModule { }
