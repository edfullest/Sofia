import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { AuthGuard, StudentGuard, ProfessorGuard, CanUpdateCourseGuard, CanViewGame } from '../../../../app/auth/auth_guard/auth.guard';
import { CreatorGamesViewComponent } from './creator-games-view/creator-games-view.component';
import { ViewerGamesViewComponent } from './viewer-games-view/viewer-games-view.component';
import { GameTopScoresComponent } from './game-top-scores/game-top-scores.component';


const routes = [
    {
        path     : 'teacher/courses/:course_id/games',
        component: CreatorGamesViewComponent,
        canActivate: [AuthGuard,CanUpdateCourseGuard]
    },
    {
        path     : 'teacher/courses/:course_id/game/create',
        component: GameComponent,
        canActivate: [AuthGuard,CanUpdateCourseGuard]
    },
    {
        path     : 'teacher/courses/:course_id/game/edit/:game_id',
        component: GameComponent,
        canActivate: [AuthGuard,CanUpdateCourseGuard]
    },
    {
        path     : 'courses/:course_id/game/view/:game_id',
        component: ViewGameComponentComponent,
        canActivate : [AuthGuard,CanViewGame]
    },
    {
        path     : 'student/courses/:course_id/games',
        component: ViewerGamesViewComponent
    },
    {
        path     : 'student/courses/:course_id/game/:game_id/topscores',
        component: GameTopScoresComponent
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
    {
        path     : 'teacher/courses/:course_id/game/:game_id/topscores/reload',
        redirectTo: 'student/courses/:course_id/game/:game_id/topscores'

    },
];

@NgModule({
    declarations: [
        GamesViewComponent,
        GameComponent,
        ViewGameComponentComponent,
        CreatorGamesViewComponent,
        ViewerGamesViewComponent,
        GameTopScoresComponent
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
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
      NO_ERRORS_SCHEMA
    ],

})

export class GamesViewModule
{
}
