import { DomainEvents } from '@/core/events/domain-events';
import { EventHandler } from '@/core/events/event-handler';
import { AnswerCreatedEvent } from '../../enterprise/events/answer-created-event';

export class OnAnswerCreated implements EventHandler {
  constructor() {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.senNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name
    );
  }

  private async senNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    console.log({ answer });
  }
}
