import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';
import { Question } from '../../enterprise/entities/question';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;
// sut = system under test

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      title: 'Title of the question',
      slug: Slug.create('title-of-the-question'),
      authorId: new UniqueEntityID('author-id'),
      content: 'Content of the question',
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: 'title-of-the-question',
    });

    expect(question.id).toBeTruthy();
    expect(question.content).toEqual('Content of the question');
    expect(question.title).toEqual(newQuestion.title);
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id);
  });
});
