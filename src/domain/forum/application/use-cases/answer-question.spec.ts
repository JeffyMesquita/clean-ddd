import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { AnswerQuestionUseCase } from './answer-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';

let inMemoryAnswerAttachmentsRepository =
  new InMemoryAnswerAttachmentsRepository();
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;
// sut = system under test

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it('should be able to answer a question', async () => {
    const result = await sut.execute({
      questionId: 'question-id',
      instructorId: 'instructor-id',
      content: 'Content of the answer',
      attachmentsIds: ['1', '2'],
    });

    expect(result.isRight()).toBeTruthy();
    expect(inMemoryAnswersRepository.items[0].id).toEqual(
      result.value?.answer.id
    );
    expect(
      inMemoryAnswersRepository.items[0].attachments.currentItems
    ).toHaveLength(2);
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({
          attachmentId: new UniqueEntityID('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityID('2'),
        }),
      ]
    );
  });
});
