import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class FuseNavigationModel implements FuseNavigationModelInterface
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'applications',
                'title'   : 'Applications',
                'translate': 'NAV.APPLICATIONS',
                'type'    : 'group',
                'children': [
                    {
                        'id'   : 'sample',
                        'title': 'Sample',
                        'translate': 'NAV.SAMPLE.TITLE',
                        'type' : 'item',
                        'icon' : 'home',
                        'url'  : '/student/courses',
                    }
                ]
            },
            {
                'id'      : 'professor',
                'title'   : 'Professor',
                'translate': 'NAV.PROFESSOR',
                'type'    : 'group',
                'children': [
                    {
                        'id'   : 'sample',
                        'title': 'Sample',
                        'translate': 'NAV.SAMPLE.PROFESSOR_TITLE',
                        'type' : 'item',
                        'icon' : 'class',
                        'url'  : '/teacher/courses',
                    }
                ]
            }
        ];
    }
}
