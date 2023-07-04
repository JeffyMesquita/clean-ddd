import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { DeleteAnswerUseCase } from './delete-answer';
import { NotAllowedError } from './errors/not-allowed-error';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';
import { makeAnswerAttachments } from 'test/factories/make-answer-attachments';

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;
// sut = system under test

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it('should be able to delete answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-id'),
      },
      new UniqueEntityID('answer-id')
    );

    await inMemoryAnswersRepository.create(newAnswer);

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachments({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeAnswerAttachments({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('2'),
      })
    );

    await sut.execute({
      answerId: 'answer-id',
      authorId: 'author-id',
    });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
    expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-id'),
      },
      new UniqueEntityID('answer-id')
    );

    await inMemoryAnswersRepository.create(newAnswer);

    const result = await sut.execute({
      answerId: 'answer-id',
      authorId: 'author-id-2',
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
