import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentQuestionsComponent } from './recent-questions.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  imports: [
    CommonModule,
    MatChipsModule
  ],
  declarations: [RecentQuestionsComponent],
  exports: [RecentQuestionsComponent]
})
export class RecentQuestionsModule { }
