import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FuseSampleComponent } from './sample.component';
import { CreateGameComponentComponent } from './create-game-component/create-game-component.component';
import { FuseWidgetModule } from '../../../core/components/widget/widget.module';

const routes = [
    {
        path     : 'sample',
        component: FuseSampleComponent
    },
    {
        path     : 'createGame',
        component: CreateGameComponentComponent
    },
];

@NgModule({
    declarations: [
        FuseSampleComponent,
        CreateGameComponentComponent
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
