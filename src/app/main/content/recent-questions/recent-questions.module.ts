import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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



@NgModule({
  imports: [
    CommonModule,
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
  declarations: [RecentQuestionsComponent],
  exports: [RecentQuestionsComponent]
})
export class RecentQuestionsModule { }
