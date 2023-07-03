import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { CreateQuestionUseCase } from './create-question';

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
    });

    expect(result.isRight()).toBeTruthy();
    expect(inMemoryQuestionsRepository.items[0]).toEqual(
      result.value?.question
    );
  });
});
