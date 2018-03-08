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
import{ AuthGuard, StudentGuard, ProfessorGuard, CanUpdateCourseGuard, CanViewGame } from '../../../../app/auth/auth_guard/auth.guard';
import { CreatorGamesViewComponent } from './creator-games-view/creator-games-view.component';
import { ViewerGamesViewComponent } from './viewer-games-view/viewer-games-view.component'


const routes = [
    {
        path     : 'teacher/courses/:course_id/games',
        component: CreatorGamesViewComponent,
        canActivate: [CanUpdateCourseGuard]
    },
    {
        path     : 'teacher/courses/:course_id/game/create',
        component: GameComponent,
        canActivate: [CanUpdateCourseGuard]
    },
    {
        path     : 'teacher/courses/:course_id/game/edit/:game_id',
        component: GameComponent,
        canActivate: [CanUpdateCourseGuard]
    },
    {
        path     : 'courses/:course_id/game/view/:game_id',
        component: ViewGameComponentComponent,
        canActivate : [CanViewGame]
    },
    {
        path     : 'student/courses/:course_id/games',
        component: ViewerGamesViewComponent
    },
    {
        path     : 'teacher/courses/:course_id/game/create/reload',
        redirectTo : 'student/courses/:course_id/games'
    },
    {
        path     : 'teacher/courses/:course_id/games/reload',
        redirectTo : 'student/courses/:course_id/games'
    },
    {
        path     : 'teacher/courses/:course_id/game/edit/:game_id/reload',
        redirectTo : 'student/courses/:course_id/games'
    },
];

@NgModule({
    declarations: [
        GamesViewComponent,
        GameComponent,
        ViewGameComponentComponent,
        CreatorGamesViewComponent,
        ViewerGamesViewComponent
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
    ],
    providers : [AuthGuard, StudentGuard, ProfessorGuard, CanUpdateCourseGuard, CanViewGame],

})

export class GamesViewModule
{
}
