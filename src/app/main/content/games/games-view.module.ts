import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { GamesViewComponent } from './games-view.component';
import { GameComponent } from './game/game.component';
import { RecentQuestionsModule } from '../recent-questions/recent-questions.module';
import { CoursesViewModule } from '../courses/courses-view.module';
import { CoursesComponent } from '../courses/courses.component';
import { RateModule } from '../rate/rate.module';


import { FuseWidgetModule } from '../../../core/components/widget/widget.module';
import { ViewGameComponentComponent } from './view-game-component/view-game-component.component';

const routes = [
    {
        path     : 'courses/:course_id/games',
        component: GamesViewComponent
    },
    {
        path     : 'courses/:course_id/game/create',
        component: GameComponent
    },
    {
        path     : 'courses/:course_id/game/edit/:game_id',
        component: GameComponent
    },
    {
        path     : 'courses/:course_id/game/view/:game_id',
        component: ViewGameComponentComponent
    }
];

@NgModule({
    declarations: [
        GamesViewComponent,
        GameComponent,
        ViewGameComponentComponent
    ],
    imports     : [
        SharedModule,
        RateModule,
        RouterModule.forChild(routes),
        FuseWidgetModule,
        RecentQuestionsModule
    ],
    exports     : [
        GamesViewComponent
    ]
})

export class GamesViewModule
{
}
