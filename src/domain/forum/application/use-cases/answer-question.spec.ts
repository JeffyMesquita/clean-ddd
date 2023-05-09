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

  it('should be able to create a question', async () => {
    const { answer } = await sut.execute({
      questionId: 'question-id',
      instructorId: 'instructor-id',
      content: 'Content of the answer',
    });

    expect(answer.id).toBeTruthy();
    expect(answer.content).toEqual('Content of the answer');
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id);
  });
});
