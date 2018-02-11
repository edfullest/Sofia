import { InMemoryDbService } from 'angular-in-memory-web-api';

import { GameFakeDB } from './game';


export class FuseFakeDbService implements InMemoryDbService
{
    createDb()
    {
        return {
            'games-games' : GameFakeDB.games,
        };
    }
}
