import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FuseSampleComponent } from './sample.component';
import { CreateGameComponent } from './create-game/create-game.component';



import { FuseWidgetModule } from '../../../core/components/widget/widget.module';
import { ViewGameComponentComponent } from './view-game-component/view-game-component.component';

const routes = [
    {
        path     : 'sample',
        component: FuseSampleComponent
    },
    {
        path     : 'game/create',
        component: CreateGameComponent
    },
    {
        path     : 'game/edit/:game_id',
        component: CreateGameComponent
    },
    {
        path     : 'game/view/:game_id',
        component: ViewGameComponentComponent
    },
];



@NgModule({
    declarations: [
        FuseSampleComponent,
        CreateGameComponent,
        ViewGameComponentComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        FuseWidgetModule,
    ],
    exports     : [
        FuseSampleComponent
    ]
})

export class FuseSampleModule
{
}
