import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { RecentQuestionsComponent } from './recent-questions.component';
import { MatChipsModule } from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import { FuseWidgetModule } from '../../../core/components/widget/widget.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { AddQuestionComponent } from './add-question/add-question.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatChipsModule,
    MatIconModule,
    MatTabsModule,
    MatGridListModule,
    FuseWidgetModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    FormsModule
  ],
  declarations: [RecentQuestionsComponent, AddQuestionComponent],
  exports: [RecentQuestionsComponent, AddQuestionComponent]
})
export class RecentQuestionsModule { }
