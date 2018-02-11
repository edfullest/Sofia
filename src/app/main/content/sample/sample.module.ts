import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FuseSampleComponent } from './sample.component';
import { CreateGameComponentComponent } from './create-game-component/create-game-component.component';
<<<<<<< HEAD
import { FuseWidgetModule } from '../../../core/components/widget/widget.module';
=======
import { ViewGameComponentComponent } from './view-game-component/view-game-component.component';
>>>>>>> 4880283aa4812e6e2265987257e41d4374c2eb32

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
