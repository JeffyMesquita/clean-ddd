import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase
// sut = system under test

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch answers of a questions', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-id'),
        createdAt: new Date(2023, 1, 1),
      }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-id'),
        createdAt: new Date(2023, 1, 2),
      }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-id'),
        createdAt: new Date(2023, 1, 3),
      }),
    )

    const { answers } = await sut.execute({
      questionId: 'question-id',
      page: 1,
    })

    expect(answers.length).toBe(3)
    expect(answers).toEqual([
      expect.objectContaining({
        createdAt: new Date(2023, 1, 3),
      }),
      expect.objectContaining({
        createdAt: new Date(2023, 1, 2),
      }),
      expect.objectContaining({
        createdAt: new Date(2023, 1, 1),
      }),
    ])
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID('question-id'),
          createdAt: new Date(2023, 1, i + 1),
        }),
      )
    }

    const { answers } = await sut.execute({
      questionId: 'question-id',
      page: 2,
    })

    expect(answers.length).toBe(2)
  })
})
