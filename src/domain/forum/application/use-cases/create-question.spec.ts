import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { CreateQuestionUseCase } from './create-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;
// sut = system under test

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: 'author-id',
      title: 'New Question',
      content: 'Content of the question',
      attachmentsIds: ['1', '2'],
    });

    expect(result.isRight()).toBeTruthy();
    expect(inMemoryQuestionsRepository.items[0]).toEqual(
      result.value?.question
    );
    expect(inMemoryQuestionsRepository.items[0].attachments).toHaveLength(2);
    expect(inMemoryQuestionsRepository.items[0].attachments).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityID('1'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityID('2'),
      }),
    ]);
  });
});
