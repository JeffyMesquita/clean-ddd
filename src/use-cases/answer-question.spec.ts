import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../entities/answer'

const fakeAnswersRepository: AnswersRepository = {
  create: async  (answer: Answer) => {
    return;
  }
}

test('create an answer to a question', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    questionId: 'question-id',
    instructorId: 'instructor-id',
    content: 'New answer'
  })

  expect(answer.content).toEqual('New answer')
})