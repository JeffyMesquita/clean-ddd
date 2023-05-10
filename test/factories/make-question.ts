import { faker } from '@faker-js/faker';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';

export function makeQuestion(override: Partial<QuestionProps> = {}): Question {
  const question = Question.create({
    authorId: new UniqueEntityID('author-id'),
    title: faker.lorem.sentence(),
    slug: Slug.create('title-of-the-question'),
    content: faker.lorem.text(),
    ...override,
  });

  return question;
}
