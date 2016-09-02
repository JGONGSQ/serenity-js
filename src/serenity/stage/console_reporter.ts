import { DomainEvent } from '../domain/events';
import { Stage, StageCrewMember } from './';

import moment = require('moment');

export function consoleReporter(): StageCrewMember {
    return new ConsoleReporter();
}

export class ConsoleReporter implements StageCrewMember {
    private static Events_of_Interest = [ DomainEvent ];
    private stage: Stage;

    assignTo(stage: Stage) {
        this.stage = stage;

        this.stage.manager.registerInterestIn(ConsoleReporter.Events_of_Interest, this);
    }

    notifyOf(event: DomainEvent<any>): void {
        // tslint:disable-next-line:no-console
        console.log(
            `${ moment(event.timestamp).format('HH:mm:ss.SSS') } | ${ event.constructor.name }: ${ event.value }`
        );
    }
}