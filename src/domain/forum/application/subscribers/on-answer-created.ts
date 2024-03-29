import { DomainEvents } from '@/core/events/domain-events';
import { EventHandler } from '@/core/events/event-handler';
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification';

import { AnswerCreatedEvent } from '../../enterprise/events/answer-created-event';
import { QuestionsRepository } from '../repositories/question-repository';

export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.senNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name
    );
  }

  private async senNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionsRepository.findById(
      answer.questionId.toString()
    );

    if (question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `Nova resposta em ${question.title
          .substring(0, 40)
          .concat('...')}`,
        content: answer.excerpt,
      });
    }
  }
}
