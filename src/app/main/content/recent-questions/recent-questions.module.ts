import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentQuestionsComponent } from './recent-questions.component';
import { MatChipsModule } from '@angular/material/chips';

import { AddQuestionComponent } from './add-question/add-question.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  declarations: [RecentQuestionsComponent, AddQuestionComponent],
  exports: [RecentQuestionsComponent, AddQuestionComponent]
})
export class RecentQuestionsModule { }
