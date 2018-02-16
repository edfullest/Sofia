import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { GamesViewComponent } from './games-view.component';
import { GameComponent } from './game/game.component';
import { RecentQuestionsModule } from '../recent-questions/recent-questions.module'


import { FuseWidgetModule } from '../../../core/components/widget/widget.module';
import { ViewGameComponentComponent } from './view-game-component/view-game-component.component';

const routes = [
    {
        path     : 'games',
        component: GamesViewComponent
    },
    {
        path     : 'game/create',
        component: GameComponent
    },
    {
        path     : 'game/edit/:game_id',
        component: GameComponent
    },
    {
        path     : 'game/view/:game_id',
        component: ViewGameComponentComponent
    },
];

@NgModule({
    declarations: [
        GamesViewComponent,
        GameComponent,
        ViewGameComponentComponent
    ],
    imports     : [
        SharedModule,
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
