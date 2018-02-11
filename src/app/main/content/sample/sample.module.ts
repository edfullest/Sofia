import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FuseSampleComponent } from './sample.component';
import { CreateGameComponentComponent } from './create-game-component/create-game-component.component';
import { ViewGameComponentComponent } from './view-game-component/view-game-component.component';

const routes = [
    {
        path     : 'sample',
        component: FuseSampleComponent
    },
    {
        path     : 'createGame',
        component: CreateGameComponentComponent
    },
    {
        path     : 'viewGame',
        component: ViewGameComponentComponent
    },
];

@NgModule({
    declarations: [
        FuseSampleComponent,
        CreateGameComponentComponent,
        ViewGameComponentComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        FuseSampleComponent
    ]
})

export class FuseSampleModule
{
}
