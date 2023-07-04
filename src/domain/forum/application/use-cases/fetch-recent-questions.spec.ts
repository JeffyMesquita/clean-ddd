import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsUseCase;
// sut = system under test

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to fetch  recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2023, 1, 1),
      })
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2023, 1, 2),
      })
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2023, 1, 3),
      })
    );

    const result = await sut.execute({ page: 1 });

    expect(result.value?.questions.length).toBe(3);
    expect(result.value?.questions).toEqual([
      expect.objectContaining({
        createdAt: new Date(2023, 1, 3),
      }),
      expect.objectContaining({
        createdAt: new Date(2023, 1, 2),
      }),
      expect.objectContaining({
        createdAt: new Date(2023, 1, 1),
      }),
    ]);
  });

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryQuestionsRepository.create(
        makeQuestion({
          createdAt: new Date(2023, 1, 1),
        })
      );
    }

    const result = await sut.execute({ page: 2 });

    expect(result.value?.questions.length).toBe(2);
  });
});
