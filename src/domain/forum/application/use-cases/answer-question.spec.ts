import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { AnswerQuestionUseCase } from './answer-question';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;
// sut = system under test

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it('should be able to answer a question', async () => {
    const result = await sut.execute({
      questionId: 'question-id',
      instructorId: 'instructor-id',
      content: 'Content of the answer',
    });

    expect(result.isRight()).toBeTruthy();
    expect(inMemoryAnswersRepository.items[0].id).toEqual(
      result.value?.answer.id
    );
  });
});
