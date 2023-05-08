import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/question-repository';
import { AnswerQuestionUseCase } from './answer-question';
import { CreateQuestionUseCase } from './create-question';

const fakeQuestionRepository: QuestionsRepository = {
  create: async (question: Question) => {},
};

test('create a question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository);

  const { question } = await createQuestion.execute({
    authorId: 'author-id',
    title: 'New Question',
    content: 'Content of the question',
  });

  expect(question.id).toBeTruthy();
  expect(question.content).toEqual('Content of the question');
});
